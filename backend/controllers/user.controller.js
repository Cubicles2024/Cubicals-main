import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import PDFDocument from "pdfkit";
import applicationModel from "../models/application.model.js";
import moment from 'moment';
import userModel from "../models/user.model.js";

// Simple email validation regex
//format: something@something.something
const simpleEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Simple password validation regex

// This regex enforces the following rules:
// - Minimum 8 characters
// - At least one lowercase letter
// - At least one uppercase letter
// - At least one digit
// - At least one special character (like @, #, $, etc.)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

class UserController {
    // Register a new user
    async register(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, role } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password || !role) {
                return res.status(400).json({ message: "Something is missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse ? cloudResponse.secure_url : null, // Handle photo upload conditionally
                },
            });

            return res.status(201).json({ message: "Account created successfully.", success: true });
        } catch (error) {
            next(error); // Propagate errors to the error handler
        }
    }

    // Login a user
    async login(req, res, next) {
        try {
            const { email, password, role } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format.", success: false });
            }

            // Check for missing fields
            if (!email || !password || !role) {
                return res.status(400).json({ message: "Something is missing", success: false });
            }

            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ message: "Incorrect email or password.", success: false });
            }

            // Check if role is correct
            if (role !== user.role) {
                return res.status(400).json({ message: "Account doesn't exist with the current role.", success: false });
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

            return res
                .status(200)
                .cookie("token", token, { 
                    httpOnly: true,
                    secure: true,                
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000 
                })
                .json({
                    message: `Welcome back ${user.fullname}`,
                    user: this.getUserResponse(user),
                    success: true,
                });
        } catch (error) {
            next(error);
        }
    }

    // Logout user
    async logout(req, res, next) {
        try {
            return res.status(200).cookie("token", "", { maxAge: 0 }).json({
                message: "Logged out successfully.",
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update user profile
    async updateProfile(req, res, next) {
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            const file = req.file;
            let cloudResponse;
            const userId = req.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found.", success: false });
            }

            // Update user data
            if (fullname) user.fullname = fullname;
            if (email) user.email = email;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (bio) user.profile.bio = bio;
            if (skills) user.profile.skills = skills.split(",");

            // Handle profile photo upload
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
                user.profile.resumeOriginalName = file.originalname; // Save original file name
            }

            await user.save();

            return res.status(200).json({
                message: "Profile updated successfully.",
                user: this.getUserResponse(user),
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // Helper function to format user response
    getUserResponse(user) {
        return {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
    }

    async generateUserReport(req, res, next) {
        try {
            const userId = req.id;
            const user = await User.findById(userId); 
    
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }
    
            const applications = await applicationModel
                .find({ applicant: userId })
                .populate({
                    path: 'job',
                    populate: { path: 'company' } // Populate the company field
                });
    
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=user_report.pdf');
        
            // Add user details to the PDF
            doc.fontSize(18).text(`User Report for ${user.fullname}`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(14).text(`Email: ${user.email}`);
            doc.text(`Phone: ${user.phoneNumber}`);
            doc.moveDown();
        
            doc.fontSize(16).text('All Applications:', { underline: true });
        
            if (applications.length === 0) {
                doc.text('No applications found.'); 
            } else {
                applications.forEach((app, index) => {
                    doc.moveDown();
                    doc.fontSize(12).text(`Application No.${index + 1}`);
                    doc.text(`Job Title: ${app.job?.title || "N/A"}`); 
                    doc.text(`Company: ${app.job?.company?.name || "N/A"}`); 
                    doc.text(`Status: ${app.status || "N/A"}`);
                    doc.text(`Applied On: ${moment(app.createdAt).format('DD-MM-YYYY')}`);
                });
            }
    
            doc.end(); 
            doc.pipe(res); 
    
        } catch (error) {
            console.error('Error generating report:', error); 
            next(error);
        }
    }

    async getAllRecruiters(req, res, next) {
        try {
            const recruiters = await userModel.find({ role: 'recruiter' }) 
                .select('fullname email phoneNumber') 

    
            if (recruiters.length === 0) {
                return res.status(404).json({ message: "No recruiters found.", success: false });
            }
    
            return res.status(200).json({ recruiters, success: true });
        } catch (error) {
            next(error);
        }
    }

    // Get total number of Recruiters
    async getRecruiterCount(req, res, next) {
        try {
            const totalRecruiters = await userModel.countDocuments({ role: 'recruiter' }); // Count users with role 'recruiter'
    
            return res.status(200).json({ count: totalRecruiters, success: true });
        } catch (error) {
            next(error);
        }
    }

    // Delete a recruiter by ID
    async deleteRecruiter(req, res, next) {
        try {
            const { id } = req.params;
            
            // Find and delete the recruiter
            const deletedRecruiter = await User.findByIdAndDelete(id);
            
            if (!deletedRecruiter) {
                return res.status(404).json({ message: 'Recruiter not found' });
            }
            
            res.status(200).json({ 
                success: true, 
                message: 'Recruiter deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting recruiter:', error);
            next(error);
        }
    }

    // Get all users with role 'student'
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find({ role: 'student' })
                .select('fullname email phoneNumber createdAt');

            if (users.length === 0) {
                return res.status(404).json({ message: "No users found.", success: false });
            }

            return res.status(200).json({ users, success: true });
        } catch (error) {
            next(error);
        }
    }

    // Delete a user by ID
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            
            // Find and delete the user
            const deletedUser = await User.findByIdAndDelete(id);
            
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found', success: false });
            }
            
            return res.status(200).json({ 
                success: true, 
                message: 'User deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            next(error);
        }
    }

    // Admin function to add a new applicant/student
    async addApplicantByAdmin(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, role = 'student' } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password) {
                return res.status(400).json({ message: "Required fields are missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
                },
            });

            return res.status(201).json({ 
                message: "Applicant created successfully.", 
                user: this.getUserResponse(newUser),
                success: true 
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin function to add a new recruiter
    async addRecruiterByAdmin(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, bio } = req.body;
            const role = 'recruiter'; // Force role to be recruiter

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password) {
                return res.status(400).json({ message: "Required fields are missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newRecruiter = await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
                    bio: bio || "",
                },
            });

            return res.status(201).json({ 
                message: "Recruiter created successfully.", 
                user: this.getUserResponse(newRecruiter),
                success: true 
            });
        } catch (error) {
            next(error);
        }
    }

    register = this.register.bind(this);
    login = this.login.bind(this);
    logout = this.logout.bind(this);
    updateProfile = this.updateProfile.bind(this);
    generateUserReport = this.generateUserReport.bind(this);
    getAllRecruiters = this.getAllRecruiters.bind(this);
    getRecruiterCount = this.getRecruiterCount.bind(this);
    deleteRecruiter = this.deleteRecruiter.bind(this);
    getAllUsers = this.getAllUsers.bind(this);
    deleteUser = this.deleteUser.bind(this);
    addApplicantByAdmin = this.addApplicantByAdmin.bind(this);
    addRecruiterByAdmin = this.addRecruiterByAdmin.bind(this);
}

const userController = new UserController();
export const { 
    register, 
    login, 
    logout, 
    updateProfile, 
    generateUserReport, 
    getAllRecruiters, 
    getRecruiterCount,
    deleteRecruiter,
    getAllUsers,
    deleteUser,
    addApplicantByAdmin,
    addRecruiterByAdmin
} = userController;

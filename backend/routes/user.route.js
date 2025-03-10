import express from "express";
import { getAllRecruiters, generateUserReport, login, logout, register, updateProfile, getRecruiterCount } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js"; 
import ErrorHandler from '../middlewares/errorHandler.js';


const router = express.Router();

// Route to register a new user (POST method)
router.route("/register").post(singleUpload, register);

// Route for user login (POST method)
router.route("/login").post(login);

// Route for user logout (GET method)
router.route("/logout").get(logout);

// Route to update user profile (POST method)
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

// Route to generate PDF report for authenticated user
router.get('/report', isAuthenticated, generateUserReport);

//Rouet to get all the recruiters
router.get('/getAllRecruiters', getAllRecruiters);

router.get('/getRecruiterCount', getRecruiterCount);

router.get("/error", (req, res, next) => {
    next(new ErrorHandler("This is a test error!", 400));
});

export default router;

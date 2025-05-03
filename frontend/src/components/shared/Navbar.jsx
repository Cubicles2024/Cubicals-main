import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import DropDown from '../ui/drop-down';
import UserFallBack from "@assets/user.png"

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <nav className='bg-black text-white sm:p-4 xm:p-4'>
            {/* Top Banner */}
            {user && user.role === 'recruiter' ? (
                <div className='flex gap-1 justify-center py-2'>
                    <span>🚀</span>
                    <div className='gradient-text-purple'>Try our pro version to smash all the boundaries</div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className='border text-sm ml-2 w-[8vw] py-[4.17px] rounded-3xl gradient-border sm:w-32 cursor-not-allowed'>
                                <span className='relative p-1 pl-7 pr-6 w-[8vw] rounded-3xl font-semibold bg-black'>
                                    Try Pro →
                                </span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-3 rounded-xl border border-purple-500/30 shadow-lg backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400">🚀</span>
                                <p className="text-sm font-medium">Logout to visit homepage</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (
                <div className='flex gap-1 justify-center py-2'>
                    <span>🚀</span>
                    <div className='gradient-text-purple'>Try our pro version to smash all the boundaries</div>
                    <Link to='/pricing'>
                        <button className='border text-sm ml-2 w-[8vw] py-[4.17px] rounded-3xl gradient-border sm:w-32'>
                            <span className='relative p-1 pl-7 pr-6 w-[8vw] rounded-3xl font-semibold bg-black'>
                                Try Pro →
                            </span>
                        </button>
                    </Link>
                </div>
            )}

            {/* Main Navbar */}
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 nav-border'>
                {/* Logo */}
                <div>
                    {user && user.role === 'recruiter' ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className='font-thin text-3xl cursor-not-allowed'>Cubicles</div>
                            </PopoverTrigger>
                            <PopoverContent className=" mx-4 bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-3 rounded-xl border border-purple-500/30 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-400">😊</span>
                                    <p className="text-sm font-medium">Logout to visit homepage</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link to='/'><h1 className='font-thin text-3xl'>Cubicles</h1></Link>
                    )}
                </div>

                {/* Navigation Links */}
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='hover:text-purple-300 transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                <li className='hover:text-purple-300 transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                <li className='hover:text-purple-300 transition-colors'><DropDown/></li>
                            </>
                        ) : (
                            <>
                                <li className='hover:text-purple-300 transition-colors'><Link to="/">Home</Link></li>
                                <li className='hover:text-purple-300 transition-colors'><Link to="/jobs">Jobs</Link></li>
                                <li className='hover:text-purple-300 transition-colors'><Link to="/browse">Browse</Link></li>
                                <li><DropDown/></li>
                            </>
                        )}
                    </ul>

                    {/* Auth Section */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline" className='text-black'>Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-purple-500/50">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || UserFallBack} 
                                        alt="profile-img" 
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl p-4 backdrop-blur-sm">
                                <div className="space-y-4">
                                    {/* Profile Section */}
                                    <div className="flex gap-3 items-center">
                                        <Avatar className="w-12 h-12 border-2 border-purple-500/50">
                                            <AvatarImage 
                                                src={user?.profile?.profilePhoto || UserFallBack} 
                                                alt="@shadcn" 
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-slate-100 text-lg">{user?.fullname}</h4>
                                            <p className="text-gray-100 text-sm line-clamp-2">
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-700" />

                                    {/* Menu Items */}
                                    <div className="space-y-2">
                                        {user?.role === 'student' && (
                                            <Link 
                                                to="/profile" 
                                                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <User2 className="w-5 h-5 text-purple-400" />
                                                    <span className="text-sm text-slate-100">View Profile</span>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                            </Link>
                                        )}

                                        <button 
                                            onClick={logoutHandler}
                                            className="w-full flex items-center 
                                            text-white gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5 text-red-400" />
                                            <span className="text-sm">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
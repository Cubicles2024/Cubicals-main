import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import animeEmoji from "/public/anime-emoji.gif"

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [popupClass, setPopupClass] = useState("hidden");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup after a delay
        const showTimer = setTimeout(() => {
            setPopupClass("visible");
        }, 1000);

        // Hide popup after 4.5 seconds
        const hideTimer = setTimeout(() => {
            setPopupClass("hidden");
        }, 4500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center h-[87.8vh] w-100% overflow-x-hidden'>
            <div className=''>
                <img className=' absolute -z-1 overflow-hidden' src='/looper-pattern.svg' />
            </div>
            <div className={`popup ${popupClass}`}>
                <p className="m-0">Hello, Welcome to Cubicles!</p>
                <div className='w-10 h-10 flex items-center'>
                    <img className='rounded-full' src='/anime-emoji.gif' alt="Welcome" />
                </div>
            </div>
            
            {/* Left part of top section starts */}
            <main className='flex mx-[6vw] my-[22vh] z-0'>

                <div className='flex flex-col gap-5 my-10 z-0'>
                    <h1 className='text-5xl text-left font-bold' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800">Discover, Apply & <br /> Get The Career Of Your <span className='text-[#6A38C2]'>Dreams</span></h1>
                    <p  data-aos="fade-down" data-aos-easing="linear" style={{ fontFamily: 'Vayu Bold', color: 'hsla(240, 5%,65%, 1)'}} className='text-lg lg:text-xl my-2'>Unlock endless opportunities and land your dream job with just a click!</p>                    
                    <div className='flex flex-start'  data-aos="fade-down" data-aos-easing="linear">
                        <div className='flex w-[60%] shadow-lg border  border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                            <input  
                                type="text"
                                placeholder='Find your dream jobs'
                                onChange={(e) => setQuery(e.target.value)}
                                className='bg-inherit outline-none border-none w-full'
                            />  
                            <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                                <Search className='h-5 w-5' />
                            </Button>
                        </div>
                        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Best Job Hunt Website</span>
                    </div>

                </div>


                {/* Right section of top part starts */}
                <div className='z-10'>

                    <div className='rowTop-1'>

                    </div>

                    <div className='rowTop-2 z-9 flex gap-7'>
                        <div className='bg-[#131315] border-[1px] p-3 rounded-xl border-zinc-800 samplecard1'>

                            <div className='flex gap-5 '>
                                <Avatar className='border-2 border-gray-500'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col text-sm z-0'>
                                    <span className='font-extrabold'>
                                        AJ Harsh Vardhan
                                    </span>
                                    <span className='flex font-semibold text-zinc-500'>@AJHarsh</span>
                                </div>
                                <Button variant="Primary" className='bg-[#006FEE] rounded-3xl  hover:bg-[#64a4ec] hover:text-[#ecebeb] h-8 w-14 my-1 z-0 text-white'>View</Button>
                            </div>
                            <div className='z-0 text-zinc-500 w-72 text-start my-2 text-sm'> Full-Stack Developer, @ThroughCubicles he/him🎉</div>
                            <div className='z-0 text-zinc-500 w-72 text-start my-2 text'> #Microsoft Followers: 27K</div>
                        </div>

                        <div className='z-5 h-[3em] w-[5em] rounded-2xl border-[3px] border-black text-black text-center flex justify-center py-3 my-10 text-lg font-[600] bg-[whitesmoke] samplecard2'> 
                            Hired!
                        </div>

                        <div className='samplecard1 my-8'>
                            <h3 className='text-[17px] font-semibold flex mx-1 text-purple-600'>Find</h3>
                            <div className='flex'>
                                <input  
                                    type="text"
                                    placeholder='Jobs, Companies'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='bg-inherit outline-none border-[2px] my-3  border-zinc-700 rounded-lg p-1 w-[9em] text-sm'
                                />   
                                <Button onClick={searchJobHandler} className="h-7 w-8 rounded-xl bg-[#6614d1e5] hover:bg-purple-950 my-[14px] mx-[1px] ">
                                    <Search className='h-[4px] w-[4px]' />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='rowTop-3'>
                        {/* COmplete */}
                    </div>


                </div>

            </main>   

        </div>
    )
}

export default HeroSection
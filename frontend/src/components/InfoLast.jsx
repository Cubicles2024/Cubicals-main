import React from 'react'
import { Button } from './ui/button'

import calenderIcon from "../assets/icons8-calender-58.png"
import githubLogo from "../assets/github-mark-logo.png"

const InfoLast = () => {
  return (
    <div className='h-screen bg-black w-100vw'>

      
      <div>
          {/* Left part of lets  make your dream true */}
        <div className='glass bg-transparent flex'>
          <div>
            <div className="text-6xl font-[900] w-[7em]" data-aos='fade-in'>
              Let's make your <span className='gradient-text'>Dream True </span>
            </div>
            <div className='text-xl text-zinc-400 text' data-aos='fade-in'>Gain your experience and internships through <span className='underline'>Cubicles.in!</span></div>
            <div>
              <div className='w-auto flex gap-4' data-aos='fade-in'>
                <Button className='bg-zinc-800 text-[13px] text-green-400 my-2 w-[80px] hover:bg-black'>Get Started</Button>
                <a href='https://github.com/Cubicles2024'><Button className='bg-zinc-800 text-[13px] text-green-400 my-2 w-[120px] hover:bg-black border-2 rounded-2xl border-zinc-700'><img src={githubLogo} className='h-8 mr-2'/>Contribute</Button></a>
                
              </div>
            </div>
          </div>


          {/* Right part */}
          <div className='flex mt-8'>
            <div data-aos='fade-right' className='mt-8 h-[18vh] ml-36 border-4 rounded-2xl border-transparent hover:border-4 cursor-not-allowed p-3 hover:border-zinc-800'>
              <div className='flex gap-2'>
                <img src={calenderIcon} className='h-[20px]'/>
                <h3 className='text-[18px] font-bold'>
                  Getting Started
                </h3>
              </div>

              <div className='text-[17px] w-[20vw] mt-2 text-zinc-500 font-[500]'>
                "Kickstart your career journey with endless opportunities—find your perfect job match today!"
              </div>
            </div>


            <div data-aos='fade-right' className='mt-8 h-[18vh] border-4 rounded-2xl border-transparent hover:border-4 cursor-not-allowed p-3 hover:border-zinc-800'>
              <div className='flex gap-2'>
                <img src={calenderIcon} className='h-[20px]'/>
                <h3 className='text-[18px] font-bold'>
                  Getting Started
                </h3>
              </div>

              <div className='text-[17px] w-[20vw] mt-2 text-zinc-500 font-[500]'>
                "Kickstart your career journey with endless opportunities—find your perfect job match today!"
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* below glass div */}
      <div  className='flex flex-col items-center mt-56 text-center'>
          <div data-aos='fade-down' data-aos-duration='800'>
            <h2 className='font-bold text-6xl'>
              Community
            </h2>
            <p className='mt-2 text-[22px] text-zinc-400'>Get involved in our community. Everyone is welcome!</p>
          </div>

          <div data-aos='fade-down' data-aos-duration='200' className='mt-12 ml-20 flex gap-10'>

              <div>
                <div className='flex'>
                  <img src='/src/assets/twitter-logo.png' className='h-[24px] mt-1 mr-2'/>
                  <span className='font-semibold text-lg'>Twitter</span>
                  <img src='/src/assets/share-logo.png' className='h-[18px] mt-2 ml-2'></img>
                </div>
                <p className='mt-3 w-[18vw] text-left text-[16px] font-[500] text-zinc-400'>For announcements, tips and general information.</p>
              </div>

              <div>
                <div className='flex'>
                  <img src='/src/assets/discord-logo.png' className='h-[24px] mt-1 mr-2'/>
                  <span className='font-semibold text-lg'>Discord</span>
                  <img src='/src/assets/share-logo.png' className='h-[18px] mt-2 ml-2'></img>
                </div>
                <p className='mt-3 w-[18vw] text-left text-[16px] font-[500] text-zinc-400'>To get involved in the community, ask questions and share tips.</p>
              </div>
              
              <a href='https://github.com/Cubicles2024/Cubicals-main' target='_blank'>
                <div className='flex '>
                  <img src='/src/assets/github-mark-logo.png' className='h-[24px] mt-1 mr-2 bg-white rounded-full'/>
                  <span className='font-semibold text-lg'>Github</span>
                  <img src='/src/assets/share-logo.png' className='h-[18px] mt-2 ml-2'></img>
                </div>
                <p className='mt-3 w-[18vw] text-left text-[16px] font-[500] text-zinc-400'>To report bugs, request features and contribute to Cubicles</p>
              </a>
          </div>
      </div>
    </div>
  )
}

export default InfoLast

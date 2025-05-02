import React from 'react'
import { Button } from './ui/button'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
import { Link } from 'react-router-dom'

import jobSeekerImage from "../assets/job-seeker-50.png"
import looperPattern from "/looper-pattern.svg"

const Info1 = () => {
  return (
    <div className="h-screen w-full">
      <div className="">
        <img
          className=" absolute top-[260vh] -z-1 overflow-hidden"
          src={looperPattern}
        />
      </div>
      <div className="top text-white mx-[8vw] ">
        <div className="text-6xl font-[900] w-[7em]">
          <h1 className="font-bold" data-aos="fade-in">
            Accessibility <span className="gradient-text">out of the</span> box.
          </h1>
        </div>
        <div className="text-[22px] text-zinc-400 font-[400] my-4 w-[24em]">
          Empowering everyone with <u>opportunities</u> - explore accessible and
          inclusive job listings tailored for all...
        </div>
      </div>

      <div className=" bottom ml-[17vh] mt-[14vh] flex gap-[5vw]">
        <div className="text-xl font-semibold">
          <div className="flex gap-[8vw] ">
            <div
              className="flex flex-col gap-[2rem] w-[15vw]"
              data-aos="fade-in"
            >
              <div className="flex gap-3 glass-sm">
                <img
                  src={jobSeekerImage}
                  className="h-[20px] mt-[4px]"
                />{" "}
                <div className="flex">Jobs search made easy</div>
              </div>
              <div className="flex gap-3 glass-sm ">
                <img
                  src={jobSeekerImage}
                  className="h-[20px] mt-[4px]"
                />{" "}
                <div className="flex ">Companies Collab Benefits</div>
              </div>
              <div className="flex gap-3 glass-sm ">
                <img
                  src={jobSeekerImage}
                  className="h-[20px] mt-[4px]"
                />{" "}
                <div className="flex ">Grow & Upskill With Us</div>
              </div>
            </div>

            <div
              className="flex flex-col gap-[2rem] w-[15vw]"
              data-aos="fade-in"
            >
              <div className="flex gap-3 glass-sm ">
                <img
                  src={jobSeekerImage}
                  className="h-[20px] mt-[4px]"
                />{" "}
                <div className="flex ">Job Alerts To Stay Updated</div>
              </div>
              <div className="flex gap-3 glass-sm ">
                <img
                  src={jobSeekerImage}
                  className="h-[20px] mt-[4px]"
                />{" "}
                <div className="flex ">Stay Conneted With Experts</div>
              </div>
              <div className="flex gap-3 glass-sm ">
                <img
                  src={jobSeekerImage}
                  className="h-[20px] mt-[4px]"
                />{" "}
                <div className="flex ">Experience Sharing Communities</div>
              </div>
            </div>
          </div>
          {/* <Button className=' bg-green-900 my-5 text-green-500' data-aos='fade-in'>Learn more</Button> */}
          <Link to="/learn-more">
            <Button
              className=" bg-green-900 my-5 text-green-500"
              data-aos="fade-in"
            >
              Learn more
            </Button>
          </Link>
        </div>

        <div>
          <div className="green-glow-card bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-[45vh] rounded-xl w-[40vw] relative -top-20">
            <div className="flex flex-row-reverse m-4">
              <HoverCard>
                <HoverCardTrigger className="my-2 w-6 px-[5px] cursor-pointer bg-black rounded-full ">
                  ⓘ
                </HoverCardTrigger>
                <HoverCardContent>
                  We helped thousands of users to get their dream job 😉.
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="w-[20vw] text-white">
              <Command className="bg-black text-white shadow-sm shadow-zinc-900 mx-[17vh]">
                <CommandInput
                  className=" text-white "
                  placeholder="Shortcuts..."
                />
                <CommandList>
                  <CommandEmpty className="bg-black text-white">
                    No results found.
                  </CommandEmpty>
                  <CommandGroup
                    heading="Suggestions"
                    className="bg-black text-white"
                  >
                    <Link to="/profile">
                      <CommandItem className="cursor-pointer">
                        ⌘ Applications
                      </CommandItem>
                    </Link>
                    <Link to="/jobs">
                      <CommandItem className="cursor-pointer">
                        ⌘ Jobs
                      </CommandItem>
                    </Link>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup
                    heading="Settings"
                    className="bg-black text-white"
                  >
                    <Link to="/profile">
                      <CommandItem className="cursor-pointer">
                        ⌘ Profile
                      </CommandItem>
                    </Link>
                    <Link to="/blog">
                      <CommandItem className="cursor-pointer">
                        ⌘ Blogs
                      </CommandItem>
                    </Link>
                    <Link to="/browse">
                      <CommandItem className="cursor-pointer">
                        ⌘ Browse
                      </CommandItem>
                    </Link>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info1

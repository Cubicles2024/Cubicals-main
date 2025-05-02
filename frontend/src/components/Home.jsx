import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Info1 from './Info1'
import InfoLast from './InfoLast'
import { Link } from 'react-router-dom'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-black text-white'>
      <Navbar/>
      <HeroSection />
      <h1 className="hero-heading">
        Transform Your Career Journey
      </h1>
      <CategoryCarousel />
      <LatestJobs />

      <Info1/>
      <InfoLast/>

      <Footer />

      <button data-testid="try-pro-button">
        <span className="relative p-1 pl-7 pr-6 w-[8vw] rounded-3xl font-semibold bg-black">
          Try Pro →
        </span>
      </button>
    </div>
  )
}

export default Home
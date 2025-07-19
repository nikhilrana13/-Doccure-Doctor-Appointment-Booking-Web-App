import BestDoctors from '@/components/homepage component/BestDoctors';
import Footer from '@/components/homepage component/Footer';
import HeroSection from '@/components/homepage component/HeroSection';
import HowItWorks from '@/components/homepage component/HowItWorks';
import JoinAsDoctor from '@/components/homepage component/JoinAsDoctor';
import Navbar from '@/components/homepage component/Navbar';
import Specialities from '@/components/homepage component/Specialities';
import TestiMonils from '@/components/homepage component/TestiMonils';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='w-full h-full '>
      <Navbar />
       <Outlet />
      {/* hero section */}
       <HeroSection />
       <Specialities />
       <BestDoctors />
       <HowItWorks />
       <TestiMonils />
       <JoinAsDoctor />
       <Footer />
    </div>
  );
}

export default Homepage

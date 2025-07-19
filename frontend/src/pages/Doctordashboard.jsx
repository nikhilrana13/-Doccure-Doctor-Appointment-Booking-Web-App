import Navbar from '@/components/homepage component/Navbar';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ArrowRight, HomeIcon, LayoutDashboard, LogOut, Settings, CalendarDaysIcon, UserCheck2Icon, CalendarArrowDownIcon, CalendarCheck } from 'lucide-react';
import ProfileCard from '@/components/patient dashboard/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '@/redux/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import DoctorProfileCard from '@/components/doctor dashboard/DoctorProfileCard';

const Doctordashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();



  const handleLogout = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{withCredentials:true});
            // console.log("response",response);
            if(response.data){
                toast.success(response?.data?.message);
                localStorage.removeItem("token");
                dispatch(SetUser(null));
                navigate("/");
            }
        } catch (error) {
            console.log("error in logout",error);
            toast.error(error?.response?.data?.message);
        }

    }
  
  

  return (
    <div>
      <Navbar />
      <div className='flex shadow-md rounded-md bg-[#F9FBFF] dark:bg-black flex-col p-3 md:p-8 items-center gap-3 justify-center'>
         <div className='flex gap-3'>
            <NavLink to="/">
                  <span><HomeIcon className='text-[#0B92ED] dark:text-white' /></span>
            </NavLink>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#465D7C] dark:text-white'>Doctor</span>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#012047] dark:text-white'>Dashboard</span>

         </div>
          <h3 className='text-[#012047] dark:text-white font-[700] text-[1.5rem] md:text-[2rem]'>Dashboard</h3>
      </div>
      <div className='flex flex-col w-full p-5 gap-2 md:flex-row '>
        {/* left side content */}
        <div className='flex flex-col shadow-md rounded-md min-h-screen  p-4 gap-5  w-full md:w-[30%]'>
           {/* profile */}
            <DoctorProfileCard   /> 
           {/* links */}
           <div className='flex flex-col gap-2'>
            <NavLink to="/doctor/doctordashboard" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <LayoutDashboard />
                    <span className='inline'>Dashboard</span>
                 </div>
            </NavLink>
             <NavLink to="/doctor/requests" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2  hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <CalendarCheck />
                    <span className='inline'>Requests</span>
                 </div>
            </NavLink>
              <NavLink to="/doctor/doctorappointments" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2  hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <CalendarDaysIcon />
                    <span className='inline'>My Appointments</span>
                 </div>
            </NavLink>
              <NavLink to="/doctor/createprofile" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <UserCheck2Icon />
                    <span className='inline'>Create profile</span>
                 </div>
            </NavLink>
             <NavLink to="/doctor/updateprofile" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <Settings />
                    <span className='inline'>Settings</span>
                 </div>
            </NavLink>
             <NavLink to="/doctor/updateslots" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <CalendarArrowDownIcon />
                    <span className='inline'>Update Slots</span>
                 </div>
            </NavLink>
             <div onClick={handleLogout} className="px-2 cursor-pointer py-2 hover:text-[#0E82FD] rounded-md ">
                  <div className='flex items-center gap-4 '>
                    <LogOut />
                    <span className='inline'>Logout</span>
                 </div>
            </div>

             
           </div>

        </div>
        {/* right side content */}
        {
          location.pathname === '/doctor' ? (
          <div className='flex w-full md:w-[70%] border items-center justify-center gap-2'>
              <h3 className='text-[#012047] dark:text-white text-center font-[700] text-[1.5rem] md:text-[2rem]'>Welcome to Doccure 🚑 !</h3>
          </div>

          ):(
            <div className='flex w-full flex-col md:w-[70%] '>
              <Outlet />
            </div>
          )
        }
      </div>

    </div>
  );
}

export default Doctordashboard;

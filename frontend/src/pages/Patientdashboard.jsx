import Navbar from '@/components/homepage component/Navbar';
import ProfileCard from '@/components/patient dashboard/ProfileCard';
import { ArrowRight, CalendarDaysIcon, HomeIcon, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const Patientdashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  // console.log("user", user);
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
            <span className='text-[#465D7C] dark:text-white'>Patient</span>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#012047] dark:text-white'>Dashboard</span>

         </div>
          <h3 className='text-[#012047] dark:text-white font-[700] text-[1.5rem] md:text-[2rem]'>Patient Dashboard</h3>
      </div>
      {/* dashboard */}
      <div className='flex flex-col w-full p-5 gap-2 md:flex-row '>
        {/* left side content */}
        <div className='flex flex-col shadow-md rounded-md min-h-screen  p-4 gap-5  w-full md:w-[30%]'>
           {/* profile */}
           <ProfileCard name={user?.name} patientId={user?._id.slice(0, 8)} gender={user?.gender || "Not Provided"} age={user?.age || "Not Provided"} profilepic={user?.profilepic || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="} />
           {/* links */}
           <div className='flex flex-col gap-2'>
            <NavLink to="/patient/dashboard" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <LayoutDashboard />
                    <span className='inline'>Dashboard</span>
                 </div>
            </NavLink>
              <NavLink to="/patient/appointments" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2  hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <CalendarDaysIcon />
                    <span className='inline'>My Appointments</span>
                 </div>
            </NavLink>
             <NavLink to="/patient/profileupdate" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <Settings />
                    <span className='inline'>Settings</span>
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
          location.pathname === '/patient' ? (
          <div className='flex w-full md:w-[70%] border items-center justify-center gap-2'>
              <h3 className='text-[#012047] text-center font-[700] text-[1.5rem] md:text-[2rem]'>Welcome to Doccure 🚑 !</h3>
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

export default Patientdashboard;

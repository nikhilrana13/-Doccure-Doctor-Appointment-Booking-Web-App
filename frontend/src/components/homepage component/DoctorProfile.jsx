import React from 'react';
import   { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, ArrowRight, MapPin, Loader2 } from 'lucide-react';

const DoctorProfile = () => {
  const location = useLocation();
  const doctor = location?.state?.Doctorinfo || {}
  // console.log("Doctor",Doctor)

  return (
    <div>
      <div className='flex shadow-md rounded-md bg-[#F9FBFF] dark:bg-black flex-col p-3 md:p-8 items-center gap-3 justify-center'>
         <div className='flex gap-3'>
            <NavLink to="/">
                  <span><HomeIcon className='text-[#0B92ED] dark:text-white' /></span>
            </NavLink>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#465D7C] dark:text-white'>Doctor</span>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#012047] dark:text-white'>Doctor profile</span>

         </div>
          <h3 className='text-[#012047] dark:text-white  font-[700] text-[1.5rem] md:text-[2rem]'>Doctor Profile</h3>
      </div>
      {/* profile card */}
           <div className='p-3  md:p-10 w-full mt-10'>
        <div className='border rounded-md shadow-md p-2 md:p-5 flex flex-col md:flex-row gap-5'>
          <div>
            <img src={doctor?.profilepic || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3NMWlJ2O7OqJz2UcJwW.jpg"} className='rounded-md' alt="Doctor profile" />
          </div>
          <div className='flex max-w-[300px] flex-col p-2 gap-4'>
             <span className='bg-[#EDF9F0] font-[500] text-center text-green-500 px-1 rounded-full text-[1rem]  py-3'>{doctor?.active ? "Available" : <><div className='text-red-500 text-center bg-[#FDEDEC]'>Not Available</div></>}</span>
               <span className='text-[1.3rem] flex flex-col  md:flex-row gap-3 p-1 dark:text-white text-black font-[500]'>{doctor?.name || "NA"}<span className='text-[0.7rem] bg-white text-center text-[#012077] border p-2 font-[500] rounded-md'>{doctor?.specialization || "NA"}</span></span>
              <span className='flex gap-3 dark:text-white text-gray-500'><MapPin /> {doctor?.location || "NA"}</span>
            
          </div>
          <div className='flex flex-col p-2 gap-2'>
            <span className='text-gray-500 dark:text-white'>Price:${doctor?.feesPerConsultation || "NA"} for a session</span>
            <NavLink to="/bookingappointment " state={{Doctorinfo:{_id:doctor._id,specialization:doctor.specialization,experiance:doctor.experiance,feesPerConsultation:doctor.feesPerConsultation,active:doctor.active,availableSlots:doctor.availableSlots,name:doctor.name,profilepic:doctor.profilepic,location:doctor.location,bio:doctor.bio}}}>
            <button className='py-2 px-4 hover:bg-blue-400 rounded-full text-sm bg-[#0E82FD] text-white'>Book appointment</button>
            </NavLink>
          </div>
        </div>
        {/* bio */}
        <div className='p-5 rounded-md mt-5 flex flex-col gap-2 border'>
            <span className='text-[1.3rem] font-[500]'>Doctor Bio</span>
            <p className='text-[1rem]  rounded-md'>{doctor?.bio}</p>
        </div>
      

      </div>
    </div>
  );
}

export default DoctorProfile;

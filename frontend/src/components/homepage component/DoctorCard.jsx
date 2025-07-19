import React from 'react';
import { Button } from '../ui/button';
import { NavLink, } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  // console.log("doctor",doctor)
    if (!doctor) return null; 
  const { specialization, active, location, feesPerConsultation } = doctor


  return (
    <NavLink to={`/doctor/${doctor._id}`} state={{ Doctorinfo: { _id: doctor._id, specialization: doctor.specialization, experience: doctor.experience, feesPerConsultation: doctor.feesPerConsultation, active: doctor.active, availableSlots: doctor.availableSlots, name:doctor?.userId?.name, profilepic:doctor?.userId?.profilepic, location:doctor?.location ,bio:doctor.bio} }}>
      <div className=' w-full md:w-[300px]  bg-white dark:bg-black  rounded-md border-2 flex flex-col h-auto'>
        <div className=''>
          <img src={doctor?.userId?.profilepic} alt="profile pic" className='rounded-md object-contain w-full ' />
        </div>
        <div className='flex flex-col p-3 gap-3'>
          <div className='flex justify-between items-center'>
            <span className='text-[#268EFC] font-[500]'>{specialization}</span>
            <span className='bg-[#EDF9F0] font-[500] text-green-500 px-5 text-[0.7rem] rounded-md py-1'>{active ? "Available" : <><div className='text-red-500 bg-[#FDEDEC]'>Not Available</div></>}</span>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-1'>
          <span className='text-[#012047] dark:text-white font-[500] text-[1.3rem]'>{doctor?.userId?.name}</span>
          <span className='text-[#465D7C] dark:text-white font-[500] text-sm '>📍{doctor.location}</span>
        </div>
        <hr />
        <div className='flex justify-between p-3 items-center gap-2'>
          <div className='flex flex-col gap-2'>
            <span className='text-[#465D7C] dark:text-white font-[500]'>Consultation Fees</span>
            <span className='text-[#E3612D] text-[1.2rem] font-[600]'>${feesPerConsultation}</span>
          </div>
          <NavLink to="/bookingappointment" state={{ Doctorinfo: { _id: doctor._id, specialization: doctor.specialization, experiance: doctor.experiance, feesPerConsultation: doctor.feesPerConsultation, active: doctor.active, availableSlots: doctor.availableSlots, name: doctor.userId?.name, profilepic: doctor.userId?.profilepic, location: doctor.location ,bio:doctor.bio} }}  >
            <button className='bg-[#012047] font-[500] hover:bg-[#0B92ED] text-white px-3 text-[0.7rem] rounded-full py-2'>
              📅 Book Now
            </button>
          </NavLink>

        </div>
      </div>

    </NavLink>

  );
}

export default DoctorCard;


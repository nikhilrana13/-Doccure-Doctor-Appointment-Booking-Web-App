import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'; 
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '@/redux/DoctorsSlice';
import axios from 'axios';

const BestDoctors = () => {
const {Doctors,loading,error} = useSelector((state)=>state.Doctor)
// console.log("doctors",Doctors);
const dispatch = useDispatch();
const scrollContainerRef = useRef(null);

const scroll = (scrollOffset) => {
  scrollContainerRef.current.scrollBy({
    left: scrollOffset,
    behavior: 'smooth'
  });
};   
// fetch doctors 
useEffect(() => {
    dispatch(fetchDoctors());
},[dispatch]);

 
    return (
        <div className='relative py-[3rem] px-8 w-full flex flex-col justify-center bg-[#F6FAFF] dark:bg-black'>
            <h3 className='text-center text-[2rem] sm:text-[2.5rem] font-[700] dark:text-white text-[#012047]'>Best Doctors</h3>
            {/* Arrows */}
            <button
                onClick={() => scroll(-300)}
                className="absolute left-9 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#0C8DF2]  hover:text-white text-[#0C8DF2] shadow-md p-2 rounded-full z-10"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={() => scroll(300)}
                className="absolute right-9 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#0C8DF2] hover:text-white shadow-md p-2 rounded-full z-10 text-[#0C8DF2]"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
            {/* doctors cards */}
            
                {
                    loading ? (
                        <>
                        <div className='flex justify-center items-center mt-10'>
                            <Loader2 className='animate-spin w-14 h-14 dark:text-white text-[#012047] text-[2rem]'/>
                        </div>
                        </>
                    ): Doctors?.length > 0 ? (
                         <div ref={scrollContainerRef} className='doctors flex gap-7 mt-10  overflow-x-auto scrollbar-hide whitespace-nowrap'>
                        {Doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor}  />
                        ))}
                    </div>
                    ): error ? (
                        <p>{error}</p>
                    ):(
                        <div className='flex justify-center items-center mt-10'>
                            <p className='text-[#012047] dark:text-white text-[1.2rem]'>No doctors found</p>
                        </div>
                    )
                }
            
        </div>
    );
}

export default BestDoctors;

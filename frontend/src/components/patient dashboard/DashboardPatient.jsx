import React, { useEffect, useState } from 'react';
import UpcomigAppointmentcard from './UpcomigAppointmentcard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DashboardPatient = () => {
  const user = useSelector((state)=>state.Auth.user);

  return (
    <div className='flex flex-col gap-4'>
      <div className='border-b p-3'>
      <h1 className='text-[1.5rem] font-[700]'>Dashboard</h1>
        </div>
    {/* content */}
      <div className="min-h-screen rounded-md bg-gray-100 dark:bg-black p-4 md:p-8">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-800">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 dark:text-white mt-1">Here's your health dashboard.</p>
      </div>

      {/* Grid Boxes */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {/* Appointment Card */}
        <UpcomigAppointmentcard />
        {/* Health Records */}
        <div className="bg-white dark:bg-black border p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold dark:text-white mb-2">Health Records</h2>
          <p className="text-sm text-gray-600 dark:text-white">This feature is coming soon.</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-black border p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold dark:text-white mb-2">Recent Activity</h2>
          <ul className="text-sm text-gray-600 dark:text-white list-disc list-inside">
            <li>No recent actions</li>
          </ul>
        </div>
         <div className="bg-[#3538CD] text-white  p-5 rounded-xl shadow-md">
          <div className='flex justify-between items-center'>
            <div>
              <h2 className="text-lg font-semibold mb-2">Book a new</h2>
              <p className="text-[1.3rem]  font-[700]">Appointment</p>
            </div>
            <NavLink to="/finddoctors">
               <PlusIcon className='cursor-pointer' />
            </NavLink>
           
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default DashboardPatient;

import React from 'react';
import { Calendar, Music, VideoIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DoctorAppointmentCard = ({apptid, name, email, profilepic, phone, date, time, id, type, status,roomName }) => {
  return (
    <div className='border bg-white dark:bg-black rounded-md p-5 flex flex-col gap-3'>
      <div className='flex items-center gap-5 flex-wrap justify-between'>
        <div className='flex items-center gap-3'>
          <img src={profilepic} className='w-12 h-12 rounded-full' alt="profile pic" />
          <div className='flex flex-col gap-2'>
            <span className='text-black dark:text-white font-[500] ' >{name}</span>
            <p className=' text-blue-600  font-[500]'>#{id.slice(0, 8)}</p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center text-sm dark:text-white text-gray-600 gap-2">
            <Calendar className="w-4 h-4 dark:text-white text-[#012047]" />
            <span className="text-[#465D7C] dark:text-white font-[500]">
              {new Date(date).toDateString()} - {time}
            </span>
          </div>
          {
            type === "Videocall" && <div className='flex items-center gap-2'>
              <VideoIcon className='text-[#465D7C] dark:text-white' />
              <span className='text-[#032249] dark:text-white font-[500]'>{type}</span>
            </div>
          }
          {
            type === "Audiocall" && <div className='flex items-center gap-2'>
              <Music className='text-[#465D7C] dark:text-white' />
              <span className='text-[#032249] dark:text-white font-[500]'>{type}</span>
            </div>
          }

        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-[#465D7C] dark:text-white'>{email}</span>
          <span className='text-[#032249] dark:text-white'>{phone}</span>
        </div>
        {
          status === "pending" ? (
            <button className='bg-[#012047] hover:bg-[#2d4545] text-white py-2 px-3 text-sm rounded-md'>
              upcoming
            </button>
          ) : status === "completed" ? (
            <NavLink to="#">
              <button className='bg-[#012047] hover:bg-[#2d4545] text-white py-2 px-4 rounded-md'>View Details</button>
            </NavLink>
          ) : (
            ""
          )
        }
        {
          status === "confirmed" && type === "Videocall" && (
            <NavLink  to={{
                pathname: "/video-call",
                search: `?room=${roomName}`,
              }}
              state={{ appointmentId: apptid }}>
              <button className='bg-[#012047] hover:bg-[#2d4545] text-white py-2 px-4 rounded-md'>Start now</button>
            </NavLink>
          ) 
        }
      </div>
    </div>
  );
}

export default DoctorAppointmentCard;

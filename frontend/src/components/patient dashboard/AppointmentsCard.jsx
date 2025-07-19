import React from 'react';
import { Calendar, CrossIcon, MessageCircle, VideoIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AppointmentsCard = ({ apptid, profilepic, name, date, time, type, email, phone, speciality, status, cancelappointment, roomName }) => {
  const isWithin10Min = () => {
    const appointmentTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diff = (appointmentTime - now) / (1000 * 60); // in minutes
    return diff <= 10 && diff >= -10; // between -10 min (running) to +10 min (future)
  };

  return (
    <div className='border bg-white dark:bg-black rounded-md p-5 flex flex-col gap-3'>
      <div className='flex items-center gap-5 flex-wrap justify-between'>
        <div className='flex items-center gap-3'>
          <img src={profilepic} className='w-12 h-12 rounded-full' alt="profile pic" />
          <div className='flex flex-col gap-2'>
            <span className='text-black dark:text-white font-[500] ' >{name}</span>
            <p className='text-[#012047] dark:text-white font-[500]'>{speciality}</p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center text-sm dark:text-white text-gray-600 gap-2">
            <Calendar className="w-4 h-4 dark:text-white text-[#012047]" />
            <span className="text-[#465D7C] dark:text-white font-[500]">
              {new Date(date).toDateString()} - {time}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[#032249] dark:text-white font-[500]'>{type}</span>
            <VideoIcon className='text-[#465D7C] dark:text-white' />
          </div>

        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-[#465D7C] dark:text-white'>{email}</span>
          <span className='text-[#032249] dark:text-white'>{phone}</span>
        </div>
        {
          status === "pending" ? (
            <div className='p-3 rounded-full cursor-pointer hover:bg-gray-300 bg-gray-200'>
              <CrossIcon onClick={cancelappointment} className='text-black ' />
            </div>
          ) : status === "completed" ? (
            <NavLink to="/finddoctors">
              <button className='bg-[#012047] hover:bg-[#2d4545] text-white py-2 px-4 rounded-md'>Book again</button>
            </NavLink>

          ) : (
            ""
          )
        }
        {
          status === "cancelled" ? (
            <NavLink to="/finddoctors">
              <button className='bg-[#012047] text-white py-2 px-4 rounded-md'>Reschedule</button>
            </NavLink>
          ) : (
            ""
          )
        }
        {/* {
          status === "confirmed" ? (
             <NavLink to="#">
                   <button className='bg-[#012047] text-white py-2 px-4 rounded-md'>Join now</button>
            </NavLink>

          ):(
            ""
          )
        } */}
        {
          status === "confirmed" && type === "Videocall" && (
            <NavLink
              to={{
                pathname: "/video-call",
                search: `?room=${roomName}`,
              }}
              state={{ appointmentId: apptid }}
            >
              <button className='bg-[#012047] text-white py-2 px-4 border rounded-md'>
                Join Video Call
              </button>
            </NavLink>

          )
        }
      </div>
    </div>
  );
}

export default AppointmentsCard;

import React, { useState } from 'react';
import { Check, X, Info, Video, PhoneCall, UserPlus, CalendarClock } from 'lucide-react'
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentRequestCard = ({ apt, setAppointments }) => {

    const handleUpdateStatus = async(id,status)=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/updateappointment/${id}`,{status:status},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  },
                  withCredentials: true
            })
            if(response.data){
                toast.success(response?.data?.message);
               setAppointments(prevAppointments=>prevAppointments.map((appointment)=>appointment._id === id ? {...appointment,status:status}:appointment))
                // console.log("response",response.data.appointment);
            }
        } catch (error) {
            console.log("failed to update status");
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Left section - Patient Info */}
            <div className="flex items-center gap-3">
                <img src={apt?.PatientId?.profilepic} alt={apt?.PatientId.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <p className="text-sm text-blue-600 font-medium">#{apt?._id.slice(0, 8)}</p>
                    <p className="font-semibold text-[1.1rem]">{apt?.PatientId.name}</p>
                </div>
            </div>

            {/* Center - Date and Purpose */}
            <div className="text-sm font-[500] dark:text-white text-gray-700 space-y-1">
                <p className="flex items-center gap-1">
                    <CalendarClock className="w-4 h-4" />
                    {new Date(apt?.date).toDateString()} - {apt?.time}
                </p>
            </div>
            {/* type of appointment */}
            <div className="flex flex-col gap-2 ">
                <span className="font-semibold">Type of Appointment</span>
                {
                    apt?.type === "Videocall" && <div className='flex items-center gap-2'>
                        <Video className="w-4 h-4 text-blue-500" /> Video call
                    </div>
                }
                {
                    apt?.type === "Audiocall" && <div className='flex items-center gap-2'>
                        <PhoneCall className="w-4 h-4 text-blue-500" /> Audiocall
                    </div>
                }
                {
                    apt?.type === "Googlemeet" && <div className='flex items-center gap-2'>
                        <PhoneCall className="w-4 h-4 text-blue-500" /> Googlemeet
                    </div>
                }

            </div>
            {/* appointment status */}
            <div className='flex p-2 flex-col gap-2'>
                <span className="font-semibold">Appointment Status</span>
                <select value={apt?.status} onChange={(e)=>handleUpdateStatus(apt?._id,e.target.value)}   className='border p-1 rounded-md dark:bg-black'>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    );
}

export default AppointmentRequestCard;

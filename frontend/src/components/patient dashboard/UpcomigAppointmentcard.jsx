import React from "react";
import { Calendar, MessageCircle, Video } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ShimmercardUpcomingappoint from "./ShimmercardUpcomingappoint";
import { NavLink } from "react-router-dom";
const UpcomigAppointmentcard = () => {
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);

    //   fetch appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/myappointments`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }, withCredentials: true
                });
                if (response.data) {
                    const pendingappointment = response.data.appointments.filter((appointment) => appointment.status === "pending");
                    setAppointments(pendingappointment);
                }
                // console.log("appointments",appointments);
            } catch (error) {
                console.log("error in fetching appointments", error);
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        fetchAppointments();
    }, [])
    return (
        <div className="bg-white dark:bg-black p-4 border rounded-xl w-full max-w-md shadow-md h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            </div>
            {/* Appointment Cards */}
            <div className="flex flex-col gap-4">
                {
                    loading ? (
                        [...Array(2)].map((_,index)=>{
                            return(
                                <ShimmercardUpcomingappoint key={index} />
                            )
                        })
                    ):appointments?.length > 0 ? (
                        appointments.map((appt) => (
                            <div
                        key={appt.id}
                        className="bg-gray-50 dark:bg-black border p-4 rounded-xl shadow-sm flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <img
                                    src={appt?.doctorId?.userId?.profilepic}
                                    alt="doctor"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold dark:text-white">{appt.doctorId?.userId?.name}</p>
                                    <p className="text-xs dark:text-white text-gray-500">{appt.doctorId?.specialization}</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 dark:bg-black p-2 rounded-full">
                                {appt.type === "video" ? <Video className="w-4 h-4" /> : <Calendar />}
                            </div>
                        </div>
                        <div className="flex items-center text-sm dark:text-white text-gray-600 gap-2">
                            <Calendar className="w-4 h-4 dark:text-white text-[#012047]" />
                            <span className="text-[#012047] dark:text-white font-[500]">
                                {new Date(appt.date).toDateString()} - {appt.time}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center dark:text-black  text-[0.8rem] gap-1 hover:bg-gray-300 font-[500] text-sm px-4 py-2 bg-gray-200 rounded-full">
                                <MessageCircle className="w-4 h-4" />
                                Chat Now
                            </button>
                            <NavLink to="/patient/appointments">
                                <button className="flex items-center  hover:bg-blue-600 font-[500] gap-1 text-sm px-4 py-2 bg-blue-500 text-white rounded-full">
                                <Calendar className="w-4 h-4" />
                                Attend
                            </button>
                            </NavLink>
                          
                        </div>
                    </div>
                            
                        ))
                    ):(
                        <div className="p-5">
                            <h1 className="text-[1rem] text-center font-[700]">No Upcoming Appointments</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default UpcomigAppointmentcard;

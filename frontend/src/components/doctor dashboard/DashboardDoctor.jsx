import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { data } from 'react-router-dom';
import AppointmentShimmerCard from './AppointmentShimmerCard';



const DashboardDoctor = () => {
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.Auth.user);
  const [Doctor, SetDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  // // fetch doctor profile
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/profile/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }, withCredentials: true
        })

        if (response.data) {
          SetDoctor(response?.data?.doctor)
        }
      } catch (error) {
        console.log("failed to fetch profile", error)
      }
    }
    fetchprofile();
    // console.log("doctor",Doctor);
  }, [user?._id])
  //fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/doctorappointments/${Doctor._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }, withCredentials: true
        })
        if (response.data) {
          const filterappointment = response?.data?.doctorappointments.filter((appt) => appt.status === "pending")
          setAppointments(filterappointment)
          // console.log(filterappointment)
        }
      } catch (error) {
        console.log("failed to fetch appointments");
      } finally {
        setTimeout(() => {
          setloading(false)
        }, 1000)
      }
    }
    fetchAppointments();
  }, [Doctor?._id]);

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Left Side Stats */}
      <div className="space-y-4">
        <div className="p-4 bg-white border dark:bg-black rounded shadow flex items-center justify-between">
          <div>
            <p className="text-sm font-[500] dark:text-white text-gray-500">Total Patient </p>
            <h2 className="text-2xl font-bold dark:text-white">{appointments?.length || 0}</h2>
          </div>
          <div className="text-gray-400 text-4xl">👤</div>
        </div>
        <div className="p-4 bg-white dark:bg-black border rounded shadow flex items-center justify-between">
          <div>
            <p className="text-sm font-[500] dark:text-white text-gray-500">Total Appointments</p>
            <h2 className="text-2xl font-bold dark:text-white">{appointments?.length || "0"}</h2>
          </div>
          <div className="text-gray-400 text-4xl">👤</div>
        </div>
      </div>
      {/* Right Side Appointment List */}
      <div className="md:col-span-2 bg-white border dark:bg-black p-5 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Appointment</h2>
          <select className="border rounded px-3 py-1 text-sm text-gray-600">
            <option>Last 7 Days</option>
            <option>Today</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="divide-y">
          {
            loading ? (
              [...Array(5)].map((_, index) => {
                return (
                  <AppointmentShimmerCard key={index} />
                )
              })
            ) : appointments?.length > 0 ? (
              appointments?.map((apt, index) => (
                <div key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <img src={apt?.PatientId?.profilepic} alt={apt?.PatientId?.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">#{apt?._id.slice(0, 8)}</p>
                      <p className="font-semibold">{apt.PatientId?.name}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm dark:text-white  text-gray-600 whitespace-nowrap">
                    <p> {new Date(apt.date).toDateString()} - {apt.time}</p>
                    <span className="bg-blue-100 mt-4 text-blue-600 px-2 py-0.5 rounded text-xs">
                      {apt.type}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5">
                <h1 className="text-[1rem] text-center font-[700]">No Appointments</h1>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardDoctor;

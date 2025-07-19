import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import AppointmentRequestCard from './AppointmentRequestCard';
import RequestShimmerCard from './RequestShimmerCard';
const Updateappointmentstatus = () => {
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
          setAppointments(response?.data?.doctorappointments)
          // console.log("appointments",appointments)
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
    <div>
       <div className='border-b p-3'>
        <h1 className='text-[1.5rem] font-[700]'>Requests</h1>
      </div>
      {/* appointment card */}
      <div className='flex flex-col mt-5 gap-2'> 
          
          {
            loading ? (
                <div className='space-y-4'>
                  {
                    [...Array(3)].map((_,index)=>{
                      return (
                        <RequestShimmerCard key={index} />
                      )
                    })
                  }
                </div>
            ):appointments.length > 0 ? (
               <div className='space-y-4'>
                {
                    appointments.map((apt,index)=>{
                        return (
                            <AppointmentRequestCard setAppointments={setAppointments} apt={apt} key={index} />
                        )
                    })
                }
             </div>
            ):(
                <p className='text-[1.4rem] mt-10 text-center font-[500] dark:text-white text-gray-500'>No Requests found</p>
            )
          }
      </div>
    </div>
  );
}

export default Updateappointmentstatus

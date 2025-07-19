import { HomeIcon, ArrowRight, Calendar } from 'lucide-react';
import React from 'react';
import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Loader2 } from 'lucide-react';


const BookingAppointment = () => {
  const [selectedDateAndTime, setselectedDateAndTime] = useState(null)
  const [appointmentType,setappointmentType] = useState("Videocall")
  const [groupedSlots, setGroupedSlots] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const doctor = location.state?.Doctorinfo || {}
  // console.log("doctor", doctor)

  useEffect(() => {
    if (doctor?.availableSlots?.length) {
      const grouped = groupSlotsByDate(doctor?.availableSlots);
      setGroupedSlots(grouped);
    } else {
      setGroupedSlots({})
    }
  }, [doctor?.availableSlots]);

  const groupSlotsByDate = (slots) => {
    const grouped = {};
    slots.forEach(({ date, time }) => {
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(time);
    });
    return grouped;
  };
  // console.log("id",doctor?.doctorid)
  const onSubmit = async()=>{
    if(!selectedDateAndTime || !appointmentType){
       toast.error("Please select a slot and appointment type.")
       return;
    }
    const date = selectedDateAndTime.toISOString().split("T")[0];
    const time = selectedDateAndTime.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true,}).replace(/\s/g, '')
     const data = {
        date:date,
        time:time,
        type:appointmentType,
     }
     try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/bookappointment/${doctor?._id}`,data,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},withCredentials:true});
      // console.log("response",response)
      if(response.data){
        toast.success(response?.data?.message);
        navigate("/appointmentpayment",{state:{
          appointmentDetails:response?.data?.newappointment,
          paymentDetails:response?.data?.paymentdetails,
          Doctor:response?.data?.doctor
        }})
      }
     } catch (error) {
      console.log("failed to Book appointment")
      toast.error(error?.response?.data?.message)
     }
  }
  // redirect after delay if data is missing
  useEffect(()=>{
    if(!location.state?.Doctorinfo) {
      const timer = setTimeout(()=>{
          toast.error("please select a doctor first")
          navigate("/finddoctors")
      },1500)
      return ()=> clearTimeout(timer)
    }
  },[navigate])
   // Show loading text if no data
  if (!location.state?.Doctorinfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg"> <Loader2 className='animate-spin w-10 h-10'/></p>
      </div>
    );
  }

  return (
    <div className='w-full '>
      <div className='flex  shadow-md m-10 rounded-md bg-[#F9FBFF] dark:bg-[#0D0D0D] flex-col p-3 md:p-8 items-center gap-3 justify-center'>
        <div className='flex gap-3'>
          <NavLink to="/">
            <span><HomeIcon className='text-[#0B92ED] dark:text-white' /></span>
          </NavLink>
          <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
          <span className='text-[#465D7C] dark:text-white'>Booking</span>
        </div>
        <h3 className='text-[#012047] dark:text-white font-[700] text-[1.5rem] md:text-[2rem]'>Booking</h3>
      </div>
      {/* booking form */}
      <div className='flex flex-col gap-5 p-3 md:p-8 '>
        {/* doctor profile */}
        <div className='bg-white dark:bg-black border rounded-md flex gap-3 p-3 md:p-8'>
          <img src={doctor?.profilepic} className='w-20 rounded-full h-20' alt="" />
          <div className='flex flex-col gap-2'>
            <span className='text-[1.2rem] dark:text-white font-[600]'>{doctor?.name || "Doctor"}</span>
            <span className='text-[#268EFC] font-[500]'>{doctor?.specialization}</span>
            <span className='text-gray-400 dark:text-white' >📍{doctor?.location || "NA"}</span>
          </div>
        </div>
        {/* select Available slots */}
        <div className='border flex flex-col  bg-white dark:bg-black  rounded-md gap-3 p-3 md:p-8 '>
          <h3 className='text-[1.4rem] dark:text-white font-[600] text-start'>Select Available Slots And Appointment Type </h3>
          {/* form */}
          <div className='mt-5 '>
            <div className='p-3'>
              <div className="max-w-4xl p-5">
                <h2 className="text-[1rem] sm:text-[1.5rem] font-bold mb-4">📅 Available Slots</h2>
                {Object.keys(groupedSlots).length === 0 ? (
                  <div className="text-gray-500 text-[1rem] font-[500]">No available slots found for this doctor.</div>
                ) : (
                  <div className='grid gap-5 grid-cols-1 md:grid-cols-3'>
                    {Object.entries(groupedSlots).map(([date, times]) => (
                      <div key={date} className="border p-4 rounded shadow-sm">
                        <h3 className="font-semibold text-lg text-blue-600 mb-2">
                          {new Date(date).toDateString()}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {times.map((time, i) => {
                            const datetimestring = `${date} ${time}`;
                            const fullDate = new Date(datetimestring);
                            return (
                              <button
                                key={i}
                                onClick={() => setselectedDateAndTime(fullDate)}
                                // className="bg-[#012047] hover:bg-[#0B92ED] text-white px-4 py-2 rounded-full text-sm"
                                className={`px-4 py-2 rounded-full text-sm ${selectedDateAndTime?.getTime() === fullDate.getTime()
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-[#012047] hover:bg-[#0B92ED] text-white'
                                  }`}
                              >
                                {
                                  fullDate.toLocaleTimeString([],{
                                    hour:'2-digit',
                                    minute:'2-digit',
                                    hour12:true
                                  })
                                }
                              </button>
                            )
                          })}

                        </div>

                      </div>
                    ))}

                  </div>
                )
                }
                {selectedDateAndTime && (
                  <div className="mt-4 text-green-600 font-semibold">
                    Selected Slot: {selectedDateAndTime.toLocaleString()}
                  </div>
                )}
              </div>
              <div className='p-5'>
                <h2 className='text-[1rem] sm:text-[1.5rem] font-bold mb-4'>Select Appointment Type</h2>
                <div>
                  <select value={appointmentType} onChange={(e)=>setappointmentType(e.target.value)} className='bg-white dark:bg-black rounded-md border px-10 py-1'>
                    <option value="Videocall">VideoCall</option>
                    <option value="Audiocall">AudioCall</option>
                     <option value="Googlemeet">Googlemeet</option>
                  </select>
                </div>

              </div>
              <div className='p-5'>
                <button type='button' onClick={onSubmit} class="px-5 py-2.5 rounded-md text-white text-sm cursor-pointer tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-400">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingAppointment;

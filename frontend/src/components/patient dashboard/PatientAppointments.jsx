import React, { useEffect } from 'react';
import AppointmentsCard from './AppointmentsCard';
import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import AppointmentCardShimmer from './AppointmentCardShimmer';
import { toast } from 'react-toastify';

const PatientAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [selectcategory, setSelectcategory] = useState("pending");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);


    const fetchappointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/myappointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials: true
      });
      // console.log("response", response);
      if (response.data) {
        setAppointments(response.data.appointments);
        const allappointments = response.data.appointments;
        const filtered = allappointments.filter((appointment)=> appointment.status === selectcategory);
        setFilteredAppointments(filtered);

      }
    } catch (error) {
      console.log("error in fetching appointments", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
   
  }
     useEffect(() => {
      fetchappointments();
  }, [selectcategory])
    // console.log("filtered", filteredAppointments);
    const cancelappointment = async(id)=>{
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/cancelappointment/${id}`,{status:"cancelled"},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          withCredentials: true
        });
        // console.log("response", response);
        if(response.data){
          toast.success(response?.data?.message)
          // remove from original appointments list
          const updatedAppointments = appointments.filter((appointment) => appointment._id !== id);
          setAppointments(updatedAppointments);
          // remove from filtered list
          const updatedfilteredAppointments = filteredAppointments.filter((appointment) => appointment._id !== id);
          setFilteredAppointments(updatedfilteredAppointments);
        }
      } catch (error) {
        console.log("error in cancel appointment", error);
        toast.error(error?.response?.data?.message);
      }
    }

  return (
    <div className=''>
      <div className='border-b p-3'>
        <h1 className='text-[1.5rem] font-[700]'>Appointments</h1>
      </div>
      {/* appointments content */}
      <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap items-center p-5 gap-3 '>
          <button onClick={() => { setSelectcategory("pending") }} className={(selectcategory === "pending" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            Pending <span className={(selectcategory === "pending" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>
              {appointments.filter((appointment) => appointment.status === "pending").length}
            </span>
          </button>
          <button onClick={() => { setSelectcategory("cancelled") }} className={(selectcategory === "cancelled" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            Cancelled <span className={(selectcategory === "cancelled" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>{appointments.filter((appointment) => appointment.status === "cancelled").length}</span>
          </button>
          <button onClick={() => { setSelectcategory("completed") }} className={(selectcategory === "completed" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            Completed <span className={(selectcategory === "completed" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>{appointments.filter((appointment) => appointment.status === "completed").length}</span>
          </button>
          <button onClick={() => { setSelectcategory("confirmed") }} className={(selectcategory === "confirmed" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            confirmed <span className={(selectcategory === "confirmed" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>{appointments.filter((appointment) => appointment.status === "confirmed").length}</span>
          </button>
        </div>
        {/* appointments */}
        <div className='flex flex-col gap-3 '>
          {/* <AppointmentsCard /> */}
          {
            loading ? (
              <>
                {
                  [...Array(4)].map((_,index)=>{
                    return (
                      <AppointmentCardShimmer key={index} />
                    )
                  })
                }
              </>
            ) : filteredAppointments?.length > 0 ? (
              filteredAppointments?.map((appointment) => {
                return (
                  <AppointmentsCard key={appointment._id} name={appointment?.doctorId?.userId?.name} profilepic={appointment?.doctorId?.userId?.profilepic} date={appointment?.date} time={appointment?.time} type={appointment?.type} email={appointment?.doctorId?.userId?.email} phone={appointment?.mobile || "Not Available"} speciality={appointment?.doctorId?.specialization} status={appointment?.status} roomName={appointment?.roomName} cancelappointment={()=>cancelappointment(appointment?._id)} apptid={appointment?._id} />
                )
              })
            ) : (
              <p className='text-[#0E82FD] text-center text-[0.9rem] font-[500]'>No Appointments</p>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default PatientAppointments;;

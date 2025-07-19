
import DoctorAppointmentCard from './DoctorAppointmentCard';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import AppointmentCardShimmer  from '../patient dashboard/AppointmentCardShimmer';
import { useSelector } from 'react-redux';
import { Calendar } from 'lucide-react';
const DoctorAppointments = () => {
  const [Doctor,SetDoctor] = useState({})
  const user = useSelector((state)=>state.Auth.user);
  const [loading, setLoading] = useState(false);
  const [selectcategory, setSelectcategory] = useState("pending");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
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

    const fetchappointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/doctorappointments/${Doctor._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials: true
      });
      if (response.data) {
        setAppointments(response?.data?.doctorappointments);
        const allappointments = response?.data?.doctorappointments;
        const filtered = allappointments?.filter((appointment)=> appointment.status === selectcategory);
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
      if(Doctor?._id){
        fetchappointments();
      }
  }, [selectcategory,Doctor?._id])
    // console.log("filtered", filteredAppointments);
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
              {appointments?.filter((appointment) => appointment.status === "pending").length}
            </span>
          </button>
          <button onClick={() => { setSelectcategory("cancelled") }} className={(selectcategory === "cancelled" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            Cancelled <span className={(selectcategory === "cancelled" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>{appointments?.filter((appointment) => appointment.status === "cancelled").length}</span>
          </button>
          <button onClick={() => { setSelectcategory("completed") }} className={(selectcategory === "completed" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            Completed <span className={(selectcategory === "completed" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>{appointments?.filter((appointment) => appointment.status === "completed").length}</span>
          </button>
            <button onClick={() => { setSelectcategory("confirmed") }} className={(selectcategory === "confirmed" ? "bg-[#0E82FD] text-white px-3 py-1 flex items-center gap-2 border text-[0.9rem] font-[500] rounded-md" : "bg-white gap-2 text-[0.9rem] font-[500] flex items-center border text-black rounded-md px-3 py-1")}>
            Confirmed <span className={(selectcategory === "confirmed" ? "bg-white text-black rounded-full w-5 h-5 flex items-center justify-center" : "bg-white text-black border rounded-full w-5 h-5 flex items-center justify-center")}>{appointments?.filter((appointment) => appointment.status === "confirmed").length}</span>
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
                  <DoctorAppointmentCard key={appointment._id} name={appointment?.PatientId?.name} profilepic={appointment?.PatientId?.profilepic} date={appointment?.date} time={appointment?.time} type={appointment?.type} email={appointment?.PatientId?.email} phone={appointment?.PatientId?.mobile || "Not Available"} id={appointment._id}   status={appointment?.status} roomName={appointment?.roomName} apptid={appointment?._id}  />
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

export default DoctorAppointments;

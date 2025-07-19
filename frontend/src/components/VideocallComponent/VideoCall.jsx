import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const VideoCall = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.Auth.user)
  const [searchParams] = useSearchParams();
  const room = searchParams.get("room");
  const location = useLocation();
  const appointmentid = location.state?.appointmentId || ""
  // console.log("apptid", appointmentid)

  useEffect(()=>{
    if(!appointmentid || !room){
      toast.error("please book a appointment")
      navigate("/finddoctors")
    }
  },[appointmentid,room,navigate])
  
  // Prevent component from rendering if values are missing
   if (!appointmentid || !room) return null;
  useEffect(() => {
    if (!room) return;
    const domain = 'meet.jit.si';
    const options = {
      roomName: room,
      width: "100%",
      height: 600,
      parentNode: document.getElementById('jitsi-container'),
      configOverwrite: { startWithAudioMuted: false },
      interfaceConfigOverwrite: {},
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // Cleanup
  }, [room]);

  const handleEndCall = async () => {
    // if (!appointmentid) {
    //   toast.error("Appointment ID missing!");
    //   return;
    // }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/complete/${appointmentid}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }, withCredentials: true
      })
      if (response.data) {
        toast.success(response?.data?.message)
        if (user?.role === "doctor") {
          navigate("/doctor/doctordashboard")
        } else {
          navigate("/patient/dashboard")
        }
      }
    } catch (error) {
      console.log("failed to end call", error)
      toast.error("Error in Ending call")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-center text-xl font-semibold">Video Consultation Room</h2>
      <div id="jitsi-container" className="w-full m-5 h-[600px] rounded-lg mt-5 shadow-md" />
      <div className='flex justify-end'>
        <Button onClick={handleEndCall} classname="mt-3">End Video call</Button>
      </div>

    </div>
  );
};

export default VideoCall;


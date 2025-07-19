import React, { useEffect } from 'react';
import { CheckCircle, Video, MapPin, Loader2 } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentDetails, Doctor } = location.state || {};
  const formatDate = (dateStr) => new Date(dateStr).toDateString();
  // redirect after delay if data is missing
  useEffect(()=>{
    if(!appointmentDetails || !Doctor ) {
      const timer = setTimeout(()=>{
          toast.error("please select a doctor first")
          navigate("/finddoctors")
      },1500)
      return ()=> clearTimeout(timer)
    }
  },[appointmentDetails,Doctor,navigate])
  // Show loading text if no data
  if (!appointmentDetails || !Doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg"> <Loader2 className='animate-spin w-10 h-10' /></p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white dark:bg-black">
      {/* Success Icon */}
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold text-center mb-8">
        Your Appointment Booked Successfully
      </h2>

      {/* Booking Card */}
      <div className="bg-white dark:bg-black  border rounded-xl shadow-md p-6 max-w-md w-full">
        {/* Doctor Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={Doctor?.profilepic}
            alt="doctor"
            className="w-16 h-16 rounded-md object-cover border"
          />
          <div>
            <p className="font-semibold text-lg">{Doctor?.name}</p>
            <p className="text-gray-500 text-sm">{Doctor?.specialization}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-2 text-sm dark:text-white text-gray-700">
          <div className="flex justify-between">
            <span>Booking Date:</span>
            <span>{formatDate(appointmentDetails?.date)}</span>
          </div>
          <div className="flex justify-between">
            <span>Booking Time:</span>
            <span>{appointmentDetails?.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Type of Consultation:</span>
            <span className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              {appointmentDetails?.type}
            </span>
          </div>
        </div>
      </div>
     <NavLink to="/patient/appointments">
            <button
         className="px-5 py-2.5 mt-5 rounded-md text-white text-sm cursor-pointer tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-400"
      >
        ← Back to Dashboard
      </button>
     </NavLink>
    </div>
  );
};

export default AppointmentSuccess;

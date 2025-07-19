import { Home } from 'lucide-react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignUp from './components/homepage component/SignUp'
import SignIn from './components/homepage component/SignIn'
import Patientdashboard from './pages/Patientdashboard'
import Doctordashboard from './pages/Doctordashboard'
import { ToastContainer } from 'react-toastify'
import DashboardPatient from './components/patient dashboard/DashboardPatient'
import PatientAppointments from './components/patient dashboard/PatientAppointments'
import UpdateProfile from './components/patient dashboard/UpdateProfile'
import FindDoctors from './pages/FindDoctors'
import BookingAppointment from './components/BookingComponent/BookingAppointment'
import Payment from './components/BookingComponent/Payment'
import AppointmentSuccess from './components/BookingComponent/AppointmentSuceess'
import DashboardDoctor from './components/doctor dashboard/DashboardDoctor'
import DoctorAppointments from './components/doctor dashboard/DoctorAppointments'
import CreateProfile from './components/doctor dashboard/CreateProfile'
import UpdateDoctorProfile from './components/doctor dashboard/UpdateDoctorProfile'
import UpdateSlots from './components/doctor dashboard/UpdateSlots'
import Updateappointmentstatus from './components/doctor dashboard/Requests'
import PatientProtectedRoute from './components/protectedRoute/PatientProtectedRoute'
import DoctorProtectedRoute from './components/protectedRoute/DoctorProtectedRoute'
import DoctorProfile from './components/homepage component/DoctorProfile'
import VideoCall from './components/VideocallComponent/VideoCall'
import VideocallProtectedRoute from './components/protectedRoute/VideocallProtectedRoute'
function App() {


  return (
    <div className='app w-full h-full px-[2vw] md:px-[8vw] '>
      {/* routes */}
       <Routes>
           {/* homepage route */}
        <Route path="/" element={<Homepage />}>
         <Route path='signup' element={<SignUp />} />
         <Route path='signin' element={<SignIn />} />
        </Route>
        {/* Patient route */}
        <Route element={<PatientProtectedRoute />}>
        <Route path='/patient' element={<Patientdashboard />}>
         <Route path='dashboard' element={<DashboardPatient />} />
         <Route path='appointments' element={<PatientAppointments />} />
         <Route path='profileupdate' element={<UpdateProfile />} />
        </Route> 
        </Route>
          {/* video call */}
          
       <Route path="/video-call" element={<VideocallProtectedRoute><VideoCall /></VideocallProtectedRoute>} />

        {/* doctor profile */}
         <Route path='/doctor/:id' element={<DoctorProfile />} />
         {/* doctor route */}
         <Route element={<DoctorProtectedRoute />}>
         <Route path='/doctor' element={<Doctordashboard />} >
          <Route path="doctordashboard" element={<DashboardDoctor />} />
           <Route path="requests" element={<Updateappointmentstatus />} />
           <Route path="doctorappointments" element={<DoctorAppointments />} />
           <Route path='createprofile' element={<CreateProfile />} />
           <Route path='updateprofile' element={<UpdateDoctorProfile />} /> 
           <Route path='updateslots' element={<UpdateSlots />} />
           </Route>
         </Route>
        
        <Route path='/finddoctors' element={<FindDoctors />} />
        {/* booking appointment */}
        <Route path='/bookingappointment' element={<BookingAppointment />} />
        <Route path='/appointmentpayment' element={<Payment />} />
        <Route path='/success' element={<AppointmentSuccess />} />
       </Routes>
     
       <ToastContainer />
    </div>
  )
}
 
export default App

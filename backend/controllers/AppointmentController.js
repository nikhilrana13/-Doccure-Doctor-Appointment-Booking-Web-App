import BookappointmentModel from "../models/BookappointmentModel.js";
import DoctorProfileModel from "../models/doctorProfileModel.js";
import UserModel from "../models/userModel.js";



export const BookAppointment = async(req,res)=>{
    try {
        const patientId = req.user;
        const doctorId = req.params.id;
        // console.log("doctorId",doctorId);
        const {date,time,type} = req.body;

        if(!date || !time){
            return res.status(400).json({message:"All fields are required"});
        }

        const patient = await UserModel.findById(patientId);
        if(!patient){
            return res.status(400).json({message:"please login to book appointment"});
        }

        const doctorProfile = await DoctorProfileModel.findById(doctorId).populate("userId","name email profilepic");
        if(!doctorProfile){
            return res.status(400).json({message:"Doctor not found"});
        }
        // check appointment is already booked or not
        const alreadybooked = await BookappointmentModel.findOne({doctorId,date,time,});
        if(alreadybooked){
            return res.status(400).json({message:"Appointment slot already booked. Please choose another slot"});
        }
        // create roomName for video call
        const roomName = `room-${Date.now()}-${doctorProfile._id}`
        // create new appointment
        const newappointment = await BookappointmentModel.create({
            PatientId:patientId,
            doctorId:doctorId,
            date:date,
            time:time,
            type,
            roomName
        },)
        const consulationFees = doctorProfile.feesPerConsultation;
        const bookingFess = 50;
        const totalfees = consulationFees + bookingFess;
        return res.status(200).json({message:"Appointment created proceed to payment",newappointment,roomName,doctor:{
            name:doctorProfile.userId.name,
            email:doctorProfile.userId.email,
            profilepic:doctorProfile.userId.profilepic,
            specialization:doctorProfile.specialization
        },paymentdetails:{
            totalfees,
            consulationFees,
            bookingFess
        }});
    } catch (error) {
        console.log("error in book appointment",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}
export const GetMyAppointments = async(req,res)=>{
    try {
        const patientId = req.user;
        const appointments = await BookappointmentModel.find({PatientId:patientId}).populate({path:"doctorId",populate:{path:"userId",select:"name email profilepic"}});
        if(!appointments){
            return res.status(400).json({message:"No appointments found"});
        }
        return res.status(200).json({message:"Appointments fetched successfully",appointments});
    } catch (error) {
        console.log("error in get my appointments",error);
        return res.status(500).json({message:"internal server error"});
    }
}
export const EachDoctorAppointments = async(req,res)=>{
    try {
        const doctorId = req.params.id;
        console.log("id",doctorId)
        const doctorappointments = await BookappointmentModel.find({doctorId:doctorId}).populate("PatientId","name email profilepic mobile");
        if(!doctorappointments){
            return res.status(400).json({message:"No appointments found"});
        }
        return res.status(200).json({message:"Appointments fetched successfully",doctorappointments});
    } catch (error) {
        console.log("error in get my appointments",error);
        return res.status(500).json({message:"internal server error"});
    }
}
export const updateAppointmentstatus = async(req,res)=>{
    try {
        const appointmentId = req.params.id;
        const {status} = req.body;

        const appointment = await BookappointmentModel.findByIdAndUpdate(appointmentId,{status},{new:true});
        if(!appointment){
            return res.status(400).json({message:"Appointment not found"});
        }
        return res.status(200).json({message:"Appointment status updated successfully",appointment});
        
    } catch (error) {
        console.log("error in update appointment status",error);
        return res.status(500).json({message:"internal server error"})
    }
}
export const cancelAppointment = async(req,res)=>{
    try {
        const patientId = req.user;
        const appointmentId = req.params.id;

        const patient = await UserModel.findById(patientId);
        if(!patient){
            return res.status(400).json({message:"Patient not found"});
        }

        const appointment = await BookappointmentModel.findByIdAndUpdate(appointmentId,{status:"cancelled"},{new:true});
        if(!appointment){
            return res.status(400).json({message:"Appointment not found"});
        }
        return res.status(200).json({message:"Appointment cancelled successfully",appointment});
    } catch (error) {
        console.log("error in cancel appointment",error);
        return res.status(500).json({message:"internal server error"});
    }
}
export const CompleteAppointment = async(req,res)=>{
    try {
        const appointmentId = req.params.id;
        // console.log("appointmentid",appointmentId)
        const appointment = await BookappointmentModel.findByIdAndUpdate(appointmentId,{status:"completed"},{new:true})
        if(!appointment){
            return res.status(400).json({message:"Appointment not found",appointment})
        }
         return res.status(200).json({message:"Call ended & appointment marked complete",appointment})
        
    } catch (error) {
         console.log("error in update appointment",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}


import mongoose from "mongoose";


const BookappointmentSchema = mongoose.Schema({
    PatientId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"DoctorProfile",required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    status:{type:String,enum:["pending","confirmed","cancelled","completed"],default:"pending"},
    type:{type:String,enum:["Videocall","Googlemeet","Audiocall"],default:"online"},
    roomName:{type:String}
    
},{timestamps:true});

const BookappointmentModel = mongoose.model("Bookappointment",BookappointmentSchema);
export default BookappointmentModel
import mongoose from "mongoose";

const DoctorProfileSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    specialization:{type:String,required:true},
    experience:{type:String,required:true},
    bio:{type:String},
    feesPerConsultation:{type:Number,required:true},
    availableSlots:[{
        date:String,
        time:String,
    }],
    location:{type:String,required:true},
    active:{type:String,enum:["active","inactive"],default:"active",required:true},
    phone:{type:String,required:true},
},{timestamps:true});

const DoctorProfileModel = mongoose.model("DoctorProfile",DoctorProfileSchema);
export default DoctorProfileModel
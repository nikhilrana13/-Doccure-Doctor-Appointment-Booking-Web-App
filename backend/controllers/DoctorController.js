import UserModel from "../models/userModel.js";
import DoctorProfileModel from "../models/doctorProfileModel.js";
import sharp from "sharp";
import cloudinary from "../config/cloudinary.js"

export const CreateDoctorProfile = async(req,res)=>{
    try {
        const userId = req.user;
        const {specialization,experience,bio,feesPerConsultation,availableSlots,location,active,phone,gender} = req.body;
        // console.log("req.file",req.file);
        // console.log("req.body",req.body);
        if( !specialization || !experience || !bio || !feesPerConsultation || ! availableSlots || !location || !active || !phone || !gender){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        // check if profile already exists
        const doctor = await DoctorProfileModel.findOne({userId});
        if(doctor){
            return res.status(400).json({message:"Profile already exists"});
        }
        const parsedslot = JSON.parse(availableSlots);
        const doctorprofile = await DoctorProfileModel.create({
            userId:user._id,
            specialization,
            experience,
            bio,
            feesPerConsultation,
            availableSlots:parsedslot,
            location,
            active,
            phone
        });
        if(req.file){
            // resize and optimize profile pic
            const optimizedProfilePic = await sharp(req.file.buffer).resize({width:300,height:300}).toFormat("jpeg").toBuffer();
            // convert to base64 format for cloudinary
            const profilepicBase64 = `data:image/jpeg;base64,${optimizedProfilePic.toString("base64")}`;
            // upload to cloudinary
            const cloudnaryresponse = await cloudinary.uploader.upload(profilepicBase64,{
                folder:"doctor-profile-pic",
                resource_type:"image"
            });
            // get the secure url of the uploaded image
            const profilepicUrl = cloudnaryresponse.secure_url;
            // update the usermodel with the profile pic url and return updateduser
          const updatedUser = await UserModel.findByIdAndUpdate(user._id,{profilepic:profilepicUrl,gender},{new:true});
          return res.status(200).json({message:"profile created successfully",doctorprofile,user:updatedUser})
        }
        // if no file then return old user
       return res.status(201).json({message:"profile created successfully",doctorprofile,user});
    } catch (error) {
        console.log("error in CreateDoctorProfile",error);
        return res.status(500).json({message:"internal server error"});
    }
}
export const UpdateDoctorProfile = async(req,res)=>{
    try {
        const userId = req.user;
        // console.log("req file",req.file)
        // check if user exists or not
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        // get data from req body
        const {name,email,specialization,experience,bio,feesPerConsultation,location,active,gender} = req.body;
        // update user info
        let updatedUser;
        if(name || email || gender){
           updatedUser = await UserModel.findByIdAndUpdate(userId,{name,email,gender},{new:true});
        }else{
            updatedUser = await UserModel.findById(userId);
        }
        // check if user exists or not
        const doctorProfile = await DoctorProfileModel.findOne({userId});
        if(!doctorProfile){
            return res.status(400).json({message:"Doctor profile not found"});
        }
        
        // update doctor profile
        const updatedoctor = await DoctorProfileModel.findByIdAndUpdate(doctorProfile._id,{specialization,experience,bio,feesPerConsultation,location,active},{new:true});
        // profile pic update
           if(req.file){
            // resize and optimize profile pic
            const optimizedProfilePic = await sharp(req.file.buffer).resize({width:300,height:300}).toFormat("jpeg").toBuffer();
            // convert to base64 format for cloudinary
            const profilepicBase64 = `data:image/jpeg;base64,${optimizedProfilePic.toString("base64")}`;
            // upload to cloudinary
            const cloudnaryresponse = await cloudinary.uploader.upload(profilepicBase64,{
                folder:"doctor-profile-pic",
                resource_type:"image"
            });
            // get the secure url of the uploaded image
            const profilepicUrl = cloudnaryresponse.secure_url;
            // update the usermodel with the profile pic url
          updatedUser = await UserModel.findByIdAndUpdate(user._id,{profilepic:profilepicUrl},{new:true});
         return res.status(200).json({message:"profile updated successfully",user:updatedUser,updatedoctor})
        }
        return res.status(200).json({message:"profile updated successfully",updatedoctor,user});
    } catch (error) {
        console.log("error in UpdateDoctorProfile",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}
export const GetallDoctors = async(req,res)=>{
    try {
        const doctors = await DoctorProfileModel.find({}).populate("userId","name email profilepic");
        if(!doctors){
            return res.status(400).json({message:"No Doctors found"});
        }
        return res.status(200).json({message:"doctors fetched successfully",doctors});
    } catch (error) {
        console.log("error in GetallDoctors",error);
        return res.status(500).json({message:"internal server error"});
    }
}
export const EachDoctorProfile = async(req,res)=>{
    try {
        const userId = req.params.id;
        // console.log("userid",userId)
        const doctor = await DoctorProfileModel.findOne({userId}).populate("userId","name email profilepic gender");
        if(!doctor){
            return res.status(400).json({message:"Doctor not found"});
        }
        return res.status(200).json({message:"doctor fetched successfully",doctor});
    } catch (error) {
        console.log("error in fetch doctor profile",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}
export const UpdateAvailablityslots = async(req,res)=>{
    try {
        // check if slots are provided or not
        if(!req.body || !req.body.availableSlots){
            return res.status(400).json({message:"Slots are required"});
        }
        // console.log("req.body",req.body);
        const {availableSlots} = req.body;
        const userId = req.user;

        const doctor = await DoctorProfileModel.findOne({userId});
        if(!doctor){
            return res.status(400).json({message:"Doctor not found"});
        }
        let parsedslots = availableSlots;
        if(typeof availableSlots === "string"){
            try {
                parsedslots = JSON.parse(availableSlots);
            } catch (error) {
                return res.status(400).json({message:"Invalid json in available slots"});
            }
        }
        const doctorprofile =  await DoctorProfileModel.findOneAndUpdate({userId},{availableSlots:parsedslots},{new:true});
        if(!doctorprofile){
            return res.status(400).json({message:"Doctor profile not found"});
        }
        return res.status(200).json({message:"slots updated successfully",updatedoctorslots:doctorprofile.availableSlots});
    } catch (error) {
        console.log("error in Update available slots",error);
        return res.status(500).json({message:"internal server error"})
    }
}






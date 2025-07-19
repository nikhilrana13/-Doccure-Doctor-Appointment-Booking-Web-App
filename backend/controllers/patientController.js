import UserModel from "../models/userModel.js";
import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";



export const UpdatePatientProfile = async(req,res)=>{
    try {
        const userId = req.user;
        const {name,email,phone,gender,age,address} = req.body;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        let profilePicUrl = user.profilepic;
        // console.log("req.file",req.file);
        if(req.file){
            // resize and optimize
        const OptimizedImageBuffer = await sharp(req.file.buffer)
          .resize({ width: 200, height: 200, fit: "inside" })
          .toFormat("jpeg", { quality: 80 })
          .toBuffer();
            //   convert to base64
          const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`;
          const cloudResponse = await cloudinary.uploader.upload(fileUrl,{
            folder:"patient-profile-pic",
            resource_type:"image"
          });
          // console.log("cloudResponse",cloudResponse);
          profilePicUrl = cloudResponse.url;
        }
        // check if user is patient or not
        if(user.role !== "patient"){
            return res.status(400).json({message:"You are not a patient"});
        }
        // update user
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{name,email,phone,profilepic:profilePicUrl,gender,age,address},{new:true});
        return res.status(200).json({message:"Profile updated successfully",updatedUser});
        
    } catch (error) {
        console.log("error in update patient profile",error);
        return res.status(500).json({message:"internal server error"});  
    }
}



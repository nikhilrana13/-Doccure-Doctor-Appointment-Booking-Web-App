import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const Signup = async(req,res)=>{
    try {
        // get data from req body
        const {name,email,password,role} = req.body;
        // required fields validation
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        // check if user already exists
        const userExists = await UserModel.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        // hash password
        const hashpassword = await bcrypt.hash(password,10);
        // create user
        const user = await UserModel.create({
            name,
            email,
            password:hashpassword,
            role
        })
        // send response
        return res.status(201).json({message:"Signup successfully",user});
    } catch (error) {
        console.log("error in signup",error);
        return res.status(500).json({message:"internal server error"}); 
    }
}

export const Login = async(req,res)=>{
    try {
        // get data from req body
        const {email,password} = req.body;
        // required fields validation
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        // check if user exists or not 
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        // check password is correct or not
        const ifmatch = await bcrypt.compare(password,user.password);
        if(!ifmatch){
            return res.status(400).json({message:"invalid credentials"});
        }
        // generate token 
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
        // console.log("Signing token with:", process.env.JWT_SECRET);
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"});
        // send response
        return res.status(200).json({message:"Login successfully",user,token})
    } catch (error) {
        console.log("error in login",error);
        return res.status(500).json({message:"internal server error"});
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"});
        return res.status(200).json({message:"Logout successfully"});
        
    } catch (error) {
        console.log("error in logout",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}
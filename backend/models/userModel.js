import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilepic:{type:String,default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"},
    gender:{type:String,enum:["male","female","other"],default:"male"},
    age:{type:Number},
    address:{type:String},
    phone:{type:String},
    role:{type:String,enum:["patient","doctor"],default:"patient"},
},{timestamps:true});

const UserModel = mongoose.model("User",userSchema);
export default UserModel
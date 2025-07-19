import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/AuthRoute.js";
import DoctorRoute from "./routes/DoctorRoute.js";
import PatientRoute from "./routes/PatientRoute.js";
import AppointmentRoute from "./routes/AppointmentRoute.js";

dotenv.config();
const app = express();

// middlewares
app.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        credentials:true
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// routes 
app.use("/api/auth",AuthRoute);
app.use("/api/doctor",DoctorRoute);
app.use("/api/patient",PatientRoute);
app.use("/api/appointment",AppointmentRoute);

// connected to db 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("failed to connect to db",err);
})




app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
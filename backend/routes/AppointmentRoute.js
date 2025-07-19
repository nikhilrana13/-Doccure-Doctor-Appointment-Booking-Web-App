import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isPatient } from "../middlewares/isPatient.js";
import { BookAppointment, GetMyAppointments, EachDoctorAppointments, updateAppointmentstatus, cancelAppointment,CompleteAppointment } from "../controllers/AppointmentController.js";
import { isDoctor } from "../middlewares/isDoctor.js";
const router = express.Router();

// patient routes
router.post("/bookappointment/:id",isAuth,isPatient,BookAppointment);
router.get("/myappointments",isAuth,isPatient,GetMyAppointments);
router.put("/cancelappointment/:id",isAuth,isPatient,cancelAppointment);
router.put("/complete/:id",isAuth,CompleteAppointment)
// doctor routes
router.get("/doctorappointments/:id",isAuth,isDoctor,EachDoctorAppointments);
router.put("/updateappointment/:id",isAuth,isDoctor,updateAppointmentstatus);
export default router
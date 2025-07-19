import express from "express";
import { CreateDoctorProfile, GetallDoctors, UpdateDoctorProfile, EachDoctorProfile, UpdateAvailablityslots } from "../controllers/DoctorController.js";
import multer from "multer";
import { isAuth } from "../middlewares/isAuth.js";
import { isDoctor } from "../middlewares/isDoctor.js";
const router = express.Router();


// multer config 
const storage = multer.memoryStorage();
const upload = multer({storage});

// routes
router.post("/createprofile",isAuth,isDoctor,upload.single("profilepic"),CreateDoctorProfile);
router.put("/updateprofile",isAuth,isDoctor,upload.single("profilepic"),UpdateDoctorProfile);
router.get("/alldoctors",GetallDoctors);
router.get("/profile/:id",isAuth,isDoctor,EachDoctorProfile);
router.put("/updateslots",isAuth,isDoctor,UpdateAvailablityslots);

export default router
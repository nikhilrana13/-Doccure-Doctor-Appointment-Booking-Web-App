import express from "express";
import { UpdatePatientProfile } from "../controllers/patientController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isPatient } from "../middlewares/isPatient.js";
import multer from "multer";
const router = express.Router();
// multer config
const storage = multer.memoryStorage();
const upload = multer({storage})
// routes
router.put("/updateprofile",isAuth,isPatient,upload.single("profilepic"),UpdatePatientProfile);

export default router
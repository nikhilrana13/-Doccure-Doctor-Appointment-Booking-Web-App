import express from "express";
import { Signup , Login, Logout} from "../controllers/AuthController.js";
const router = express.Router();




// routes
router.post("/signup",Signup);
router.post("/login",Login);
router.get("/logout",Logout);

export default router
import { response, Router } from "express";
import {StuentSignup, studentLogin, StaffSignup, StaffLogin} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/studentsignup", StuentSignup);
authRoutes.post("/studentlogin", studentLogin);
authRoutes.post("/staffsignup", StaffSignup);
authRoutes.post("/stafflogin", StaffLogin);

export default authRoutes;
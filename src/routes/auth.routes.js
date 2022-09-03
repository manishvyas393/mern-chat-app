import { Router } from "express";
import { loginUser, signUpUser, getUserProfile, logoutUser } from "../controllers/authController.js";
import checkUser from "../utils/checkAuth.js"
const router = Router()
router.post("/signup", signUpUser)
router.post("/login", loginUser)
router.get("/getprofile", checkUser, getUserProfile)
router.post("/logout",checkUser,logoutUser)
export default router
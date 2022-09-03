import { Router } from "express";
import { allUsers, createOrCheckChat, fetchChats, singleChat } from "../controllers/chatController.js";
import checkUser from "../utils/checkAuth.js";
const router = Router()
router.post("/newchat/:id", checkUser, createOrCheckChat)
router.get("/allchat", checkUser, fetchChats)
router.get("/singlechat/:id", checkUser, singleChat)
router.get("/searchusers",checkUser,allUsers)
export default router
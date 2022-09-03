import { Router } from "express";
import { fetchAllMessages, sendMessage } from "../controllers/message.controller.js";
import checkUser from "../utils/checkAuth.js"
const router = Router()
router.post("/newmessage/:id", checkUser, sendMessage)
router.get("/allmessages/:chatId",checkUser,fetchAllMessages)
export default router
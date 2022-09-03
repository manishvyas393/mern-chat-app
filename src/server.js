import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import session from "express-session";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Store from "connect-mongodb-session"
import authRouter from "./routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js"
import messageRouter from "./routes/message.routes.js"
import path from "path";
import http from "http"
import cors from "cors"
import { fileURLToPath } from 'url';
const app = express()
const port = process.env.PORT || 3001
const MyStore = Store(session)
const server = http.createServer(app)
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, "../")
console.log(path.resolve(dir, "chat-client", "build", "index.html"))
const io = new Server(server, ({
      cors: {
            origin: "http://localhost:3000"
      }
}));
dotenv.config()
mongoose.connect(process.env.mongo_uri, () => console.log("mongo connected"))
const till = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
app.use(cors({
      origin: true,
      credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
      secret: "qwertyuiopoiuytrewqwertyui",
      resave: false,
      saveUninitialized: false,
      store: new MyStore({
            uri: process.env.mongo_uri,
            collection: 'sessions',
            expires: till
      }),
}))
app.use("/api/auth", authRouter)
app.use("/api/chat", chatRouter)
app.use("/api/messages", messageRouter)
if (process.env.NODE_ENV === "production") {
      //Set static folder
      console.log(express.static("./../chat-client/build"))
      app.use(express.static("./../chat-client/build"));
      app.get("*", (req, res) => {
            res.sendFile(path.resolve(dir, "chat-client", "build", "index.html"));
      });
}

io.on("connection", (socket) => {
      socket.on("join", (username, chatId, cb) => {
            if (!username || !chatId) {
                  return cb("no data")
            }
            socket.join(chatId)
      })
      socket.on("sendMessage", (newMsg,chatId) => {
            if (newMsg) {
                  io.to(chatId).emit("message",newMsg)
            }
      })
})
server.listen(port, () => {
      console.log("server started on " + port)
})
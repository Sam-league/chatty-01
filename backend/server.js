import express from "express";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import RequestModel from "./models/requestModel.js";
import { Server } from "socket.io";
import { createServer } from "http";
import UserModel from "./models/userModel.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const request = RequestModel.watch();
const Users = UserModel.watch();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/", userRoute);

io.on("connection", (socket) => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  request.on("change", (data) => {
    socket.emit(`${data.fullDocument?.user_id} request`);
  });

  Users.on("change", (data) => {
    socket.emit("new user");
  });
});

httpServer.listen(8080, console.log("server is running on port 8080"));

// app.listen();

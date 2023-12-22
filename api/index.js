import express from 'express';
import cors from 'cors';
import connectDb from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import path from 'path';
import { Server } from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);



app.get('/', (req, res) => { res.send ('The server is running')});

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);


const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`.yellow.bold)
);


const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    console.log("new message", newMessageRecieved);
console.log("chat", chat);

  if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      io.to(user._id).emit("message received", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    // Handle disconnect logic if needed
  });
});
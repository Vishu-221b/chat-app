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
const port = process.env.PORT || 5000;
connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);


const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`.yellow.bold)
);


const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://hehechat.onrender.com",
  },
});

  io.on("connection", (socket) => {
  console.log("Connected to socket.io");


  socket.on("setup", (userData) => {
    try {
      console.log("User setup:", userData);
      socket.join(userData._id);
      socket.emit("connected");
      console.log("User joined room:", userData._id);
    } catch (error) {
      console.error("Error in setup:", error);
    }
  });

    socket.on("join chat", (room) => {
      try {
        console.log("User joining chat:", room);
        socket.join(room);
        console.log("User Joined Room: ", room);
      } catch (error) {
        console.error("Error in join chat:", error);
      }
    });




   socket.on("typing", (room) => socket.in(room).emit("typing"));
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

   socket.on("stop typing", (room) => {
     try {
       socket.in(room).emit("stop typing");
       console.log("User stopped typing");
     } catch (error) {
       console.error("Error in stop typing:", error);
     }
   });

   socket.on("new message", (newMessageRecieved) => {
     try {
       let chat = newMessageRecieved.chat;
        console.log("chat:", chat);
       if (!chat.users) return console.log("chat.users not defined");

       chat.users.forEach((user) => {
         if (user._id == newMessageRecieved.sender._id) return;

         socket.in(user._id).emit("message recieved", newMessageRecieved);
       });
     } catch (error) {
       console.error("Error in new message:", error);
     }
   });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    // Handle disconnect logic if needed
  });
});
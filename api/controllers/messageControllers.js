import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    var message = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
      
    });
    

    try {
      message = await message
        .populate("sender", "name pic");
        
    } catch (error) {
      console.log("Error during population1:", error);
    }

     try {
       message = await message.populate("chat", "users");
     } catch (error) {
       console.log("Error during population2:", error);
     }

    try {
      message = await User
      .populate(message, {path: "chat.users",select: "name pic email",});
    
    } catch (error) {
      console.log("Error during population:", error);
    }

    try {
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      res.json(message);
    } catch (error) {
      console.log("Error updating chat or sending response:", error);
    }
  } catch (error) {
    res.status(500); // Use 500 for server errors
    throw new Error(error.message);
  }
});

export default { allMessages, sendMessage };

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export default function connectToDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => console.log("Error connecting to database:", error));
   
}

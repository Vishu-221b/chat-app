import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";


dotenv.config();


export default function connectDb(){
    const conn = mongoose.connect(process.env.MONGO_URI)
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit(1); // Exit with a non-zero status code to indicate an error
      });
   
}


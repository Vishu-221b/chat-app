import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import cors from 'cors';

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("Connected to database");})
.catch((error) => console.log("Error connecting to database:", error));

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.json ('Hello people, Welcome to my world.')});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
        const createdUser = await User.create({ username, password });

        //create a token
        const token = jsonwebtoken.sign({ userId: createdUser._id }, process.env.JWT_SECRET);
        res.cookie("token",token).status(201).json({ message: "User created successfully." })


    } catch(error){
        res.status(500).json({ message: "Error creating user." });
    }

});

app.listen(port, () => console.log("The server is running."));
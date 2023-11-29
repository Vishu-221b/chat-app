import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("Connected to database");})
.catch((error) => console.log("Error connecting to database:", error));

const app = express();

const port = 3000;

app.get('/', (req, res) => { res.json ('Hello people, Welcome to my world.')});

app.post('register', async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password })

});

app.listen(port, () => console.log("The server is running."));
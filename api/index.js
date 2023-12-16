import express from 'express';
import cors from 'cors';
import connectDb from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDb();

app.use(cors());
app.use(express.json());


app.use("/api/user", userRoutes);


app.get('/', (req, res) => { res.send ('The server is running')});

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(port, () => console.log(`The server is running on port ${port} `.yellow));
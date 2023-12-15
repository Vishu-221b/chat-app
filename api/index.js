import express from 'express';
import cors from 'cors';
import chats from './data/data.js';
import connectToDatabase from "./config/db.js";


const app = express();
const port = 3000;
connectToDatabase();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => { res.json ('Hello people, Welcome to my world.')});

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req,res)=> {
    const singlechat = chats.find((c) => c._id === req.params.id);
    res.send(singlechat);
})



app.listen(port, () => console.log("The server is running."));
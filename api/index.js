import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => { res.send ('Hello people, Welcome to my world.')});

app.listen(port, () => console.log("The server is running."));
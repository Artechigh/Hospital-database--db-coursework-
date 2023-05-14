/////////////////////////
// ESSENTIALS

import express from 'express'; 
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url';


const app = express();
var corsOptions = {
  origin: "http://localhost:9000" //To get requests from frontend
};

app.use(cors(corsOptions));
app.use(express.json());



const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sendJson = async (req, res, data) => { // ! don't use JSON.stringify on "data"  // example: app.get('/json', (req, res) => sendJson(req,res,{id:2,name:"mom"}))
    console.log(`GET request received for: ${req.originalUrl}`);
    res.set('Content-Type', 'application/json');
    res.json(data);
};

/////////////////////////
// OPTIONAL

// import {
// ...
// } from "../prisma/prismaFunctions.js";


app.get('/', (req, res) => {
  console.log(`GET request received for: ${req.originalUrl}`);
  res.json({ message: "Welcome to my application." });
});

app.post('/api', (req) => {
  console.log(`POST request received for: ${req.originalUrl}`);
  console.log(`POST body: ${JSON.stringify(req.body)}`);
  //res.
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

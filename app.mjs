/////////////////////////
// ESSENTIALS

import express from 'express'; // "npm install express" required
import cors from 'cors';
import path from 'path'; // "npm install path" required
import { fileURLToPath } from 'url';



const app = express();
var corsOptions = {
  origin: "http://localhost:9000" //To get erequests from frontend
};

app.use(cors(corsOptions));
app.use(express.json());

/////////////////////////
// USEFULL

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function requestNotifier(req) {
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
}

/////////////////////////
// OPTIONAL

import {
  createHospital,
  createUser,
  findUserByEmail,
  createDoctor,
  createPatient,
  createAppointment,
  createPrescription,
  getAllDoctorsByHospitals,
  getDoctorDataById,
} from "./prisma/prismaFunctions.mjs";

app.get('/', (req, res) => {
  requestNotifier(req)
  res.json({ message: "Welcome to my application." });
});

// getDoctorDataById(1).then(result=>{
//   console.log(`search result: ${JSON.stringify(result)}\n`)})

app.post('/data/doctor',(req,res)=>{
  requestNotifier(req)
  console.log(`searching doctor data by id`);
  getDoctorDataById(req.body.id).then(result=>{
    console.log(`search result: ${JSON.stringify(result)}\n`)
    res.json(result)
    console.log(`result responded`); 
  })
})


app.post('/data/hospitals',(req,res)=>{
  requestNotifier(req)
  console.log(`getting all hospital records from database`);
  getAllDoctorsByHospitals().then(result=>{
    console.log(`search result: ${JSON.stringify(result)}\n`)
    res.json(result)
    console.log(`result responded`);
  })
})

app.post('/api/login', (req, res) => {
  requestNotifier(req)
  console.log(`searching existing record with the requested email in database`);
  findUserByEmail(req.body.email).then(result=>{
    console.log(`search result: ${JSON.stringify(result)}\n`);
    if (result==null) {
      res.json({message: "Записи с данной э. почтой не найдено"})
    } else {
      if (req.body.password==result.password) {
        res.json({ message: "Вход произведен успешно, перенаправление." }); 
      } else {
        res.json({ message: "Введен неверный пароль"})
      }
    }
  })
})

app.post('/api/register', (req,res) => {
  requestNotifier(req)

  console.log(`searching existing record with the requested email in database`)
  findUserByEmail(req.body.email).then(result => {
    console.log(`search result: ${JSON.stringify(result)}\n`);
    if (result==null) {
      console.log(`creating new record in database`);
      createUser(req.body.name, req.body.email, req.body.password).then(result => {
        console.log(`created result: ${JSON.stringify(result)}\n`);
        if (result==null) {
          res.json({isSuccess: false, message: `server error`})
        } else {
          res.json({isSuccess: true, message: `registration successful`})
        }
      })
    } else {
      res.json({isSuccess: false, message: `email is already registered`})
    }
  })
})



app.listen(3000, () => {
  console.log('Server started on port 3000');
});

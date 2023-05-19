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

function logJsonSeachResult(jsonResult){
  if (Array.isArray(jsonResult)) {
    console.log("search result:");
    console.log('[');
    jsonResult.forEach((element) => {
      console.log(`${JSON.stringify(element)},`);
    });
    console.log(']');
  } else {
    console.log(`search result: ${JSON.stringify(jsonResult)}`);
  }  
}
function requestNotifier(req) {
  console.log(`${req.method} request received for: ${req.originalUrl}`);
  console.log(`request body: ${JSON.stringify(req.body)}`);
}
function respondJsonResult(res,jsonResult) {
  logJsonSeachResult(jsonResult)
  res.json(jsonResult)
  console.log(`json responded\n`); 
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
  getDoctorDataLiteById,
  getAllDoctorsBySpecialtyAndHospitalId,
  getAllAppointmentsLiteByDoctorId,
  getDoctorsHospitalsAndAppointments,
  getPatientsAppointments
} from "./prisma/prismaFunctions.mjs";
import { log } from 'console';

app.post('/data/doctor',(req,res)=>{
  requestNotifier(req)
  console.log(`searching doctor data by id`);
  getDoctorDataLiteById(req.body.id).then(result=>{
    respondJsonResult(res,result)
  })
})

app.post('/data/createAppointment', (req,res)=>{
  requestNotifier(req)
  console.log('create appointment')
  createAppointment(req.body.date, req.body.doctorId, req.body.patientId, req.body.hospitalId).then(result=>{
    respondJsonResult(res,result)
  })
})

app.post('/data/doctor/hospitalsAndAppointments', (req,res)=>{
  requestNotifier(req)
  console.log('get doctors hospitalsAndAppointments by id')
  getDoctorsHospitalsAndAppointments(req.body.id).then(result=>{
    respondJsonResult(res,result)
  })
})

// getDoctorsHospitalsAndAppointments(2).then(result=>{
//   console.log(`/hospitalsAndAppointments: ${JSON.stringify(result) }`);})


app.post('/data/patient/appointments', (req,res)=>{
  requestNotifier(req)
  console.log('get doctors hospitalsAndAppointments by id')
  getPatientsAppointments(req.body.id).then(result=>{
    respondJsonResult(res,result)
  })
})

// getPatientsAppointments(4).then(result=>{
//   console.log(`/appointments: ${JSON.stringify(result) }`);
// })


app.post('/data/doctor/nextAppointments', (req,res)=>{
  requestNotifier(req)
  console.log('searching for All Appointments Lite By Doctor Id');
  getAllAppointmentsLiteByDoctorId(req.body.id).then(result=>{
    respondJsonResult(res,result)
  })
})

app.get('/data/hospitals',(req,res)=>{
  requestNotifier(req)
  console.log(`getting all hospital records from database`);
  getAllDoctorsByHospitals().then(result=>{
    respondJsonResult(res,result)
  })
})

app.post('/data/doctors', (req,res)=>{
  requestNotifier(req)
  console.log(`searching existing records with the requested specialty and hospitalId in database`)
  getAllDoctorsBySpecialtyAndHospitalId(req.body.specialty,req.body.hospitalId).then(result=>{
    respondJsonResult(res,result)
  })
})

//////////////////////////////////////////////////////////////////////////

app.post('/api/login', (req, res) => {
  requestNotifier(req)
  console.log(`searching existing record with the requested email in database`);
  findUserByEmail(req.body.email).then(result=>{
    console.log(`search result: ${JSON.stringify(result)}\n`);
    if (result==null) {
      res.json({message: "Записи с данной э. почтой не найдено"})
    } else {
      if (req.body.password==result.password) {
        res.json({ message: "Вход произведен успешно, перенаправление.", User: result }); 
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




app.get('/', (req, res) => {
  requestNotifier(req)
  res.json({ message: "Welcome to my application." });
});

app.listen(3000, () => {
  console.log('Server started on port 3000\n');
});


// /appointments: {"Appointments":[{"date":"2023-05-10T10:00:00.000Z","diagnosis":"астигматизм","Hospital":{"name":"Первая городская больница"},"Doctor":{"specialty":"окулист","User":{"name":"Ермолова Милана Антоновна"}},"Prescriptions":[{"id":1,"name":"очки","dosage":"постоянно","instructions":"","doctorId":2,"patientId":4,"appointmentId":4},{"id":2,"name":"ацидофилин","dosage":"3 раза в день 7 дней в неделю","instructions":"","doctorId":2,"patientId":4,"appointmentId":4}]}]}

// /hospitalsAndAppointments: {"Hospitals":[{"name":"Первая городская больница"}],"Appointments":[{"date":"2023-05-18T10:00:00.000Z","diagnosis":"","Hospital":{"name":"Первая городская больница"},"Patient":{"User":{"name":"Соколов Денис Константинович"}},"Prescriptions":[]},{"date":"2023-05-10T10:00:00.000Z","diagnosis":"астигматизм","Hospital":{"name":"Первая городская больница"},"Patient":{"User":{"name":"Соболева Кира Никитична"}},"Prescriptions":[{"id":1,"name":"очки","dosage":"постоянно","instructions":"","doctorId":2,"patientId":4,"appointmentId":4},{"id":2,"name":"ацидофилин","dosage":"3 раза в день 7 дней в неделю","instructions":"","doctorId":2,"patientId":4,"appointmentId":4}]}]}
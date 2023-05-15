// import packages must be installed with "npm instal 'name' "
// requested files must be located near this (app.mjs) file

// to add prisma database manager make sure:
// it's installed "npm instal prisma"
// prisma project was initialized "npx prisma init" (exists already)
// database provider is online
// .env file exists and contains DATABASE_URL="postgresql://johndoe:password@localhost:5432/databaseName?schema=public" with the correct data ("password" can be empty)
// prisma packages and database provider are updated after changing schema.prisma file ("npx prisma generate", "npx prisma db push")
//


// use "node app.mjs" to run the app

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

// function isEmailRegistered(email) { // searching if email was already registered
//   console.log(findUserByEmail(email))
//   if (findUserByEmail(email)) {return true}
//   else {return false}
// }

// const sendJson = async (req, res, data) => { // ! don't use JSON.stringify on "data"  // example: app.get('/json', (req, res) => sendJson(req,res,{id:2,name:"mom"}))
//     console.log(`GET request received for: ${req.originalUrl}`);
//     res.set('Content-Type', 'application/json');
//     res.json(data);
// };

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
} from "./prisma/prismaFunctions.mjs";
import { Result } from 'postcss';


app.get('/', (req, res) => {
  requestNotifier(req)
  res.json({ message: "Welcome to my application." });
});

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

// endpoint /api/register
// 
// registerform.js
// 
// {
//  name: "Монахов Артем"
//  email: "exapmle@mail.ru"
//  password: "example"
// }
// заполнение регистрации пользователя в бд
// ответ - успешно / нет



app.listen(3000, () => {
  console.log('Server started on port 3000');
});

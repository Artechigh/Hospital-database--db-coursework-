import React from "react";
import './globals.css'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wrapper from './components/wrapper.jsx'
import Appointment from "./routes/appointment.jsx";
import Login from "./components/loginform.jsx";
import NotFound from "./components/404.jsx";
import SignIn from "./components/registerform.jsx";
import DoctorProfile from "./routes/doctorprofile.jsx";
import ProfilePage from "./routes/profilepage";
// import {
//     createBrowserRouter,
//     RouterProvider,
//   } from "react-router-dom";


  const container = document.getElementById("root");
  const root = createRoot(container);
  
  // const router = createBrowserRouter([
  //     {
  //       path: "/",
  //       element: <Root/>,
  //     },
  //   ]);
  
  
  
  
    root.render(
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='appointment' element={<Appointment />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<SignIn />} />
              <Route path='doctor/:id/:hId' element={<DoctorProfile />} />
              <Route path='myProfile' element={<ProfilePage />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
  );

//   ReactDOM.createRoot(document.getElementById("root")).render(
//       <Wrapper>
//         <RouterProvider router={router}/>
//       </Wrapper>
// );
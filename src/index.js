import React from "react";
import './globals.css'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wrapper from './components/wrapper.js'
import Root from "./routes/root.js";
import Login from "./components/loginform.js";
import NotFound from "./components/404.js";
import SignIn from "./components/registerform.js";
import Profile from "./components/profile";
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
              <Route path='' element={<Root />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<SignIn />} />
              <Route path='profile' element={<Profile />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
  );

//   ReactDOM.createRoot(document.getElementById("root")).render(
//       <Wrapper>
//         <RouterProvider router={router}/>
//       </Wrapper>
// );
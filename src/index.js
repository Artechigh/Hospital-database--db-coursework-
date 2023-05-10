import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root.js";
import './globals.css'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);


  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}/>
);
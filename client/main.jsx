import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Todopage from "./src/pages/Todopage.jsx";
import Home from "./src/pages/Home.jsx";
import Login from "./src/pages/Login.jsx";
import SingUp from "./src/pages/SignUp";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/liste",
    element: <Todopage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/connexion",
    element: <Login />,
  },
  {
    path: "/creation",
    element: <SingUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

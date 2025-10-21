import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import React from "react";
import { router } from "./route";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <RouterProvider router={router} />,
  </React.StrictMode>
);

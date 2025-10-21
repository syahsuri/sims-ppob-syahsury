import { Navigate, createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Sign-up";
import Layout from "./App";
import Transaction from "./pages/Transaction";
import Homepage from "./pages/Homepage";
import Account from "./pages/Account";
import Topup from "./pages/Top-up";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />, // Redirect root to /home
      },
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "/topup",
        element: <Topup />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/akun",
        element: <Account />,
      },
    ],
  },
]);

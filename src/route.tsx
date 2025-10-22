import { Navigate, createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Sign-up";
import Layout from "./App";
import Transaction from "./pages/Transaction";
import Homepage from "./pages/Homepage";
import Account from "./pages/Account";
import Topup from "./pages/Top-up";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import Payment from "./pages/Payment";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/home" replace />,
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
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/akun",
            element: <Account />,
          },
        ],
      },
    ],
  },
]);

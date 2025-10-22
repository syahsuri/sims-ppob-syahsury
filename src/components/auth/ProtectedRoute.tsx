import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hooks";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

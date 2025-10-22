import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  // If already authenticated, redirect to home
  return isAuthenticated ? <Navigate to="/home" replace /> : <>{children}</>;
};
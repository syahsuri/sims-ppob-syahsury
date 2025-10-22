import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  return isAuthenticated ? <Navigate to="/home" replace /> : <>{children}</>;
};
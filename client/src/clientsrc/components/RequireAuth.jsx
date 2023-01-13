import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../Context/AuthProvider"

const RequireAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  return  currentUser? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;

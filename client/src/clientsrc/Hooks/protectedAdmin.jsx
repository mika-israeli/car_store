import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../Context/AuthProvider"

const ProtectedAdmin = () => {
  const {userData} = useAuth();
  const location = useLocation();
  return  userData?.isAdmin? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedAdmin;

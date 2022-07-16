import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const RequireAuth = () => {
  const { Auth } = useAuth();
  console.log(Auth);
  const location = useLocation();
  return Auth.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;

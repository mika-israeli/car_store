import { useEffect } from "react";
import { Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRefreshToken from "../Hooks/useRefreshToken";

const PresistLogin = () => {
  const [isLoading, setisLoading] = useState(true);
  const refresh = useRefreshToken();
  const { Auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    };
  }, []);
  useEffect(() => {
    console.log("is ");
  }, [isLoadin]);

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
};

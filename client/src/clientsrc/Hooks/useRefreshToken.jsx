import axios from "../api/axios";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    const token = response.headers["access-token"];
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(token);
      return { ...prev, accessToken: token };
    });
    return token;
  };
  return refresh;
};

export default useRefreshToken;

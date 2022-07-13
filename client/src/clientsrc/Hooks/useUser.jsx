import { useContext } from "react";
import UserContext from "../Context/UserProvider";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;

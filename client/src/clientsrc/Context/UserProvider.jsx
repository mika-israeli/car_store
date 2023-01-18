import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleSetUser = (user) => {
    setUser(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  return (
    <UserContext.Provider
      value={{ User, setUser: (user) => handleSetUser(user) }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

import { useEffect } from 'react';
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({});
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  const handleSetAuth = ({ accessToken, isAdmin }) => {
    setAuth({ accessToken, isAdmin });
    localStorage.setItem('auth', JSON.stringify({ accessToken, isAdmin }));
  };
  return (
    <AuthContext.Provider
      value={{
        Auth,
        setAuth: ({ accessToken, isAdmin }) =>
          handleSetAuth({ accessToken, isAdmin }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import { ThemeProvider } from "@mui/material";
import React from "react";
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";
import { CartProvider } from "./Context/CartProvider";
import { UserProvider } from "./Context/UserProvider";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const ThemeContext = createContext("dark");
root.render(
  <React.StrictMode>
    <BrowserRouter baseUrl="/">
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/*" element={<App />}></Route>
              </Routes>
            </ThemeProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./clientsrc/App";
import { AuthProvider } from "./clientsrc/Context/AuthProvider";
import { CartProvider } from "./clientsrc/Context/CartProvider";
import { UserProvider } from "./clientsrc/Context/UserProvider";
import { theme } from "./theme";
import AdminMain from "./admin/src/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const ThemeContext = createContext("dark");
root.render(
  <React.StrictMode>
    <BrowserRouter baseUrl="/">
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/*" element={<App />}></Route>
                <Route path="/admin/*" element={<AdminMain />} />
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

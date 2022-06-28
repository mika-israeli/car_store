import React, { useState, useEffect } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/Nav";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Contact from "./Pages/Contact";
import Layout from "./Pages/Layout";
import RequireAuth from "./components/RequireAuth";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
//import data from "./mockData";
function App() {
  return (
    <div>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Toaster />
        <CssBaseline enableColorScheme />
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/Cars" element={<Products />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<RequireAuth />}>
              <Route path="/Contact" element={<Contact />} />
            </Route>
          </Route>
        </Routes>
      </Box>
      <Footer />
    </div>
  );
}

export default App;

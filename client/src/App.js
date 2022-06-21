import CarFeed from "./components/CarFeed";
import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import SelectableList from "./components/SelectableList";
import LeftBar from "./components/LeftBar";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/Nav";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import LayoutTemplate from "./Pages/LayoutTemplate";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
//import data from "./mockData";
function App() {
  return (
    <div>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Routes>
        <Route path="/Cars" element={<Products />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

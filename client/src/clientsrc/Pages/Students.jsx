import { darken } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import daniel from "../../assets/daniel.jpeg";
import mika from "../../assets/mika.jpeg";
import shon from "../../assets/shon.jpg";
import jony from "../../assets/jony.jpg";
import Canvas from "../components/Canvas";

const Students = () => {
  return (
    <main>
      <Outlet />

      <div className="center_box">
        <h1>CAR BAZAR</h1>
        <Canvas />
      </div>
      <div className="partners_containers ">
        <div className="partners fade left">
          <b>Daniel Ohayon </b>
          <b>danielohayon420@gmail.com</b>
          <img id="student_image" src={daniel} alt="daniel" />
        </div>
        <div className="partners fade left" style={{ top: "40vh" }}>
          <b>Mika Israeli</b>
          <b>mika80666@gmail.com</b>
          <img id="student_image" src={mika} alt="daniel" />
        </div>
        <div className="partners right fade">
          <b>Jony Singer</b>
          <b>jonysinger1@gmail.com</b>
          <img id="student_image" src={jony} alt="daniel" />
        </div>
        <div className="partners right fade" style={{ top: "40vh" }}>
          <b>Shon Hazan</b>
          <b>shonhazan1@gmail.com</b>
          <img id="student_image" src={shon} alt="daniel" />
        </div>
      </div>
    </main>
  );
};

export default Students;

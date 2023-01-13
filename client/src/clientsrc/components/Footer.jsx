import * as React from "react";
import Call from "./call/Call";


const Footer = () => {

  return (
    <footer
      style={{
        background: "linear-gradient(to right , #13314C, #106bba)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monospace",
        opacity:0.9,
        position: "sticky",
        bottom: 0,
        minHeight: "70px",
        width: "100%",
      }}
    >
      {/* <h2 style={{ color: 'white', fontWeight: 'bold' }}>Crypto Currency</h2> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin:5
        }}
      >
        <Call/>
      </div>
    </footer>
  );
};

export default Footer;

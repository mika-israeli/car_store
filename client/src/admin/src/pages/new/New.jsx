import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Nevbar from "../../components/nevbar/Nevbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { matchRoutes, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import React from "react";

//I need to add punctionality to add users here

const New = ({ inputs, productRows }) => {
  const [file, setFile] = useState("");
  const location = useLocation();
  const locationArr = location.pathname.split("/");
  const id = locationArr[locationArr.length -1];
  
  const product = productRows.find(product=>product._id == id);

  console.log(product);
  // document.getElementById('userInput').value
  const updateObject = ()=>{
    if (document.getElementsByClassName("userInput-color")[0].value != ""){
      console.log(document.getElementsByClassName("userInput-color")[0].value);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Nevbar />
        <div className="top">
          <h1>{"Edit Product"}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={product.image != null ? product.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))} */}
              
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={product[input.label]} className={`userInput-${input.label}`} />
                </div>
                
              ))}
             
            </form>
            <button onClick={function (){updateObject();}}>Send</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

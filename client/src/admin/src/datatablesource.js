import { Modal, modalUnstyledClasses } from "@mui/material";
import { useState } from "react";
import axios from "./api/axios";

export const userColumns = [
    { field: "_id", headerName: "ID", width: 100 },

    {
      field: "username",
      headerName: "Username",
      width: 100,
    },

    {
        field: "email",
        headerName: "Email",
        width: 230,
      },
    
     
      {
        field: "createdAt",
        headerName: "Created At",
        width: 230,
      },
    ];

  


//temporary data until i get from DB


  export const productColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.manufacturer}
          </div>
        );
      },
    },
    {
      field: "model",
      headerName: "Model",
      width: 100,
    },
    {
      field: "year",
      headerName: "Year",
      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    }
  ]



  export const orderColumns = [
    { field: "_id", headerName: "Order Id", width: 100 },
    { field: "userid", headerName: "User Id", width: 100 },
    { field: "date", headerName: "date", width: 190 },
    {field: "status",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        }
      }



  ]

  
import "./orderSingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Nevbar from "../../components/nevbar/Nevbar";
import OrderList from "../OrderList/OrderList";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { matchRoutes, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import React from "react";





const OrderSingle = ({inputs}) => {

    const location = useLocation();
    const locationArr = location.pathname.split("/");
    const id = locationArr[locationArr.length -1];
    const order = inputs.orderRows.find(order=>order._id == id);


  console.log(order);

  const sendOrder = ()=>{
    order.status == "pending" ? order.status = "Approved" : order.status = "pending";
  }

  //need to fix sendorder and to send the result to DB

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Nevbar />
        <div className="top">
          <div className="left">
            <h1 className="title">User Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{order.userDetails.firstName +" "+ order.userDetails.lastName }</h1>
                 <div className="detailItem">
                  <span className="itemKey">Addresss:</span>
                  <span className="itemValue">{order.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">
                    {order.createdAt}
                  </span>
                </div> 
                <div className="detailItem">
                  <span className="itemKey">User Id:</span>
                  <span className="itemValue">{order.userid}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Order Status:</span>
                  <span className="itemValue">{order.status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Send order to client?</span>
                  <input type="checkbox" onClick={sendOrder()}></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Order Details</h1>
          <OrderList order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderSingle;
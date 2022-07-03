import React, { useState } from "react";
import { axiosPrivate } from "../api/axios";
import useUser from "../Hooks/useUser";
import useAuth from "../Hooks/useAuth";
import { Box } from "@mui/system";
import { List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Order from "../components/Order";
const OrderHistory = () => {
  const { User } = useUser();
  const { Auth } = useAuth();
  const privateAxios = axiosPrivate(Auth.accessToken);
  const [Orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Auth.accessToken) {
      navigate("/login");
    }
    privateAxios
      .get(`/orders/find/${User._id}`)
      .then((res) => res.data)
      .then((data) => setOrders(data));
  }, []);

  return (
    <Box component="main" display="flex" justifyContent="center" alignItems={"center"} flexDirection="column" sx={{ mb: 4 }}>
      <Typography variant="h4">Order History</Typography>
      {Orders ? Orders.map((order) => <Order order={order} />) : <Typography variant="h5">No Orders</Typography>}
    </Box>
  );
};

export default OrderHistory;

import { Card, List, ListItem, Paper, Typography, Container } from "@mui/material";

import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "../Hooks/useAuth";

import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import useCart from "../Hooks/useCart";
const Order = ({ order }) => {
  const date = new Date(order.date);
  const { Auth } = useAuth();
  const privateAxios = axiosPrivate(Auth.accessToken);
  const orderDetails = {
    firstName: "",
    lastName: "",
    address1: "",
    zip: "",
    city: "",
    email: "",
  };
  const products = order.items.map((product) => {
    return {
      name: product.manufacturer + " " + product.model,
      desc: product.description,
      year: product.year,
      price: product.price,
    };
  });
  console.log(order);
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Order Number : {order._id}
        </Typography>
        <Typography gutterBottom variant="body2">
          Date of order: {new Date(order.date).toISOString().slice(0, 10)}
        </Typography>
        <List disablePadding>
          {products.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }} divider>
              <ListItemText primary={product.year + " " + product.name} secondary={product.desc} />
              <Typography variant="body2">{product.price.toLocaleString()} $</Typography>
            </ListItem>
          ))}

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {order.amount.toLocaleString()} $
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping details
            </Typography>
            <Typography gutterBottom>
              {order.userDetails.firstName} {order.userDetails.lastName}
            </Typography>
            <Typography gutterBottom>{order.address}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Status : {order.status}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default Order;

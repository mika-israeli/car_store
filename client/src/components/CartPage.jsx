import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useCart from "../Hooks/useCart";
import Car from "./Car";

const CartPage = () => {
  const { Cart, setCart } = useCart();

  return (
    <Box minWidth={600} maxWidth={600} component="section" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h4">Your cart</Typography>

      {Cart.map((item) => {
        return (
          <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 5 }} maxWidth={550}>
            <hr />
            <Typography variant="h6">
              <b>{item.manufacturer}</b>
            </Typography>
            <img src={item.image} />
          </Box>
        );
      })}
    </Box>
  );
};

export default CartPage;

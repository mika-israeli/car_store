import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useCart from "../Hooks/useCart";
import Car from "./Car";

const CartPage = () => {
  const { Cart, setCart } = useCart();

  console.log(Cart);

  return (
    <Box minWidth={600}>
      {Cart.map((item) => {
        return (
          <Box>
            <img src={item.image} />
            <Typography>Car maker : {item.manufacturer}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default CartPage;

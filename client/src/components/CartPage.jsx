import { Button, Dialog, DialogContent, Divider, IconButton, Tooltip, Typography, DialogContentText, DialogActions, DialogTitle, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useCart from "../Hooks/useCart";
import Car from "./Car";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import toast from "react-hot-toast";
import { TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router";
import UserRecommendation from "./UserRecommendation";

const CartPage = ({ closeCart }) => {
  const { Cart, setCart } = useCart();
  const [alertOpen, setalertOpen] = useState(false);
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const onWantToRemove = (event) => {
    setitemtoremove(event.currentTarget.value);
    setalertOpen(true);
  };
  const navigate = useNavigate();
  const onItemRemove = () => {
    const index = Cart.findIndex((item) => item._id === itemtoremove);
    const newCart = [...Cart];
    if (index > -1) {
      const item = Cart[index];
      newCart.splice(index, 1);
      toast(`${item.manufacturer} ${item.model} ${item.year} was removed from your cart`, {
        icon: "❌",
      });
    }
    setCart(newCart);
    setalertOpen(false);
  };
  const showRecommendation = () => {
    setRecommendationsOpen(true);
  };
  const [itemtoremove, setitemtoremove] = useState({});
  console.log(Cart);
  return (
    <Box minWidth={600} maxWidth={600} component="section" height="100%" sx={{ display: "flex", flexDirection: "column" }} padding={2}>
      <Dialog open={alertOpen} onClose={() => setalertOpen(false)}>
        <DialogTitle id="alert-dialog-title">Remove Item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to remove this item from your cart?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setalertOpen(false)}>Cancel</Button>
          <Button onClick={(item) => onItemRemove(item)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={recommendationsOpen} onClose={() => setRecommendationsOpen(false)} maxWidth={"100%"}>
        <DialogTitle>Recommendation</DialogTitle>
        <DialogContent>
          <UserRecommendation />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRecommendationsOpen(false);
              closeCart();
              navigate("/checkout");
            }}
          >
            Thanks!
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4">Your cart</Typography>
      {Cart.length === 0 ? (
        <Typography variant="body2" paddingTop={2}>
          Your cart is empty
        </Typography>
      ) : (
        <TransitionGroup>
          <Collapse>
            {Cart.map((item) => {
              return (
                <Box component="div" display="flex" alignItems="center" flexDirection="column">
                  <Divider orientation="horizontal" sx={{ width: "90%" }} />
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 5, padding: 3 }} maxWidth={550}>
                    <Box justifyContent="flex-start" display="flex" sx={{ width: "500px" }} flexDirection="column">
                      <img src={item.image} style={{ maxWidth: 150, maxHeight: 150 }} />
                      <Typography variant="h6">
                        <b>
                          {item.manufacturer} {item.model}
                        </b>
                      </Typography>
                      <Typography variant="overline">
                        {item.year} in {item.color} color
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <IconButton edge="start" size="small" onClick={onWantToRemove} value={item._id}>
                        <Tooltip title="Remove item" enterDelay={120} placement="top">
                          <RemoveCircleOutlineIcon />
                        </Tooltip>
                      </IconButton>
                      <Typography variant="body">Price: {item.price.toLocaleString()}$</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Collapse>
        </TransitionGroup>
      )}

      <Box component="footer" position="sticky" bottom={0} bgcolor="#E8E8E8">
        <Divider orientation="horizontal" />
        <Typography position="static" bottom={0} variant="h6">
          Total: {Cart.reduce((a, b) => a + b.price, 0).toLocaleString()}$
        </Typography>
        {Cart.length > 0 && (
          <Button
            variant="contained"
            onClick={() => {
              setRecommendationsOpen(true);
            }}
          >
            Checkout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;

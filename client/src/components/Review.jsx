import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import useCart from "../Hooks/useCart";
import { Divider } from "@mui/material";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review({ shippingDetails, products }) {
  const { Cart } = useCart();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
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
            {Cart.reduce((acc, product) => acc + product.price, 0).toLocaleString()} $
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping details
          </Typography>
          <Typography gutterBottom>
            {shippingDetails.firstName} {shippingDetails.lastName}
          </Typography>
          <Typography gutterBottom>
            {shippingDetails.address1},{shippingDetails.city}
          </Typography>
          <Typography gutterBottom>{shippingDetails.zip}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}></Grid>
      </Grid>
    </React.Fragment>
  );
}

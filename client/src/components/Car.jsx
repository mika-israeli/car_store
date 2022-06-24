import { Grid, ListItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { palette } from "@mui/system";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { tableCellClasses } from "@mui/material/TableCell";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useCart from "../Hooks/useCart";
import toast from "react-hot-toast";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Car = ({ item, addToCart }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAddCart = () => {
    setCart([...Cart, item]);
    toast(`${item.manufacturer} ${item.model} ${item.year} was added to the cart`, {
      icon: "🚗",
    });
  };
  const { Cart, setCart } = useCart();
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345, minHeight: 250 }}>
      <CardHeader title={`${item.manufacturer} ${item.model} `} subheader={`${item.year}  ${parseFloat(item.price).toLocaleString()}$`} />
      <CardMedia component="img" height="200" image={item.image} alt="car image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Add to cart">
          <IconButton onClick={() => handleAddCart()}>
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <Tooltip title="More Info">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Table
            padding="checkbox"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBlockColor: "rgba(0, 23, 76, 0.4)",
              },
            }}
          >
            <TableBody>
              <TableRow hover>
                <TableCell> Manufacturer</TableCell>
                <TableCell>{item.manufacturer}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Model </TableCell>
                <TableCell>{item.model}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell> Year</TableCell>
                <TableCell>{item.year}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell> Color</TableCell>
                <TableCell>{item.color}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell> Categories</TableCell>
                <TableCell>{`${item.type}`}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell> Killometers</TableCell>
                <TableCell>{`${parseFloat(item.kilometers).toLocaleString()} Km`}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell> Price</TableCell>
                <TableCell>{parseFloat(item.price).toLocaleString()} $</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Car;

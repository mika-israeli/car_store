import { Grid, ListItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={`${item.maker} ${item.model} `} subheader={`${item.year}  ${parseFloat(item.price).toLocaleString()}$`} />
      <CardMedia component="img" height="200" image={item.image} alt="car image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, veniam doloremque debitis, voluptates soluta, nobis eligendi esse unde illum ipsa aspernatur expedita? Consequuntur minima dolores eaque necessitatibus magni dicta
          saepe?
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Add to cart">
          <IconButton>
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
          <Table padding="checkbox">
            <TableBody>
              <TableRow hover>
                <TableCell> Maker</TableCell>
                <TableCell>{item.maker}</TableCell>
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

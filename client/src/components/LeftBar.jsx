import { AppBar, CssBaseline, Drawer, Hidden, Slider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CarFeed from "./CarFeed";
import SelectableList from "./SelectableList";
import { useState } from "react";
import Navbar from "./Nav";
import SideBar from "./SideBar";
const LeftBar = ({ items }) => {
  const manufacturers = new Set(items.map((i) => i.manufacturer).sort());
  const colors = new Set(items.map((i) => i.color).sort());
  const [allCars, setallCars] = useState(items);
  const [filterCars, setfilterCars] = useState(items);
  const [filters, setfilters] = useState([]);
  const priceRange = [Math.max(...items.map((i) => i.price)), Math.min(...items.map((i) => i.price))];
  const onFilterChange = (key, value, checked) => {
    if (checked) {
      const newCars = filterCars.filter((car) => {
        return car[`${key}`] === value;
      });
      filters.push({ key, value });

      setfilterCars(newCars);
    } else {
      filters.forEach((f, index) => (f.key === key && f.value === value ? filters.splice(index, 1) : f));

      setfilterCars(allCars);
      let temp = [...allCars];
      filters.forEach((filter) => {
        const newCars = temp.filter((car) => {
          return car[filter.key] === filter.value;
        });
        temp = newCars;
      });
      setfilterCars(temp);
    }
  };
  const onPriceChange = (event, value) => {
    let newcars = [...allCars];
    newcars = newcars.filter((car) => car.price <= value[1] && car.price >= value[0]);
    filters.forEach((filter) => {
      const newCars = newcars.filter((car) => {
        return car[filter.key] === filter.value;
      });
      newcars = newCars;
      console.log(newcars, " newcars");
    });
    setfilterCars(newcars);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}></AppBar>
      <Drawer variant="persistent" sx={{ width: 350, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" } }} hideBackdrop elevation={0} open={true}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <SelectableList label="manufacturer" values={Array.from(manufacturers)} onFilterChange={onFilterChange} />
          <SelectableList label="color" values={Array.from(colors)} onFilterChange={onFilterChange} />
          <Typography>Price</Typography>
          <Slider defaultValue={priceRange} max={priceRange[0]} min={priceRange[1]} valueLabelDisplay="auto" sx={{ maxWidth: 200, margin: 4 }} size="small" onChangeCommitted={onPriceChange} />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <CarFeed items={filterCars} />
      </Box>
    </Box>
  );
};

export default LeftBar;

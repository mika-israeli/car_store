import { AppBar, Button, CssBaseline, Drawer, Hidden, Input, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CarFeed from "./CarFeed";
import SelectableList from "./SelectableList";
import { useState } from "react";
import Navbar from "./Nav";
import SideBar from "./SideBar";
const LeftBar = ({ items, onApplyChanges }) => {
  const manufacturers = new Set(items.map((i) => i.manufacturer).sort());
  const colors = new Set(items.map((i) => i.color).sort());
  const [filters, setfilters] = useState([]);
  const priceRange = [Math.min(...items.map((i) => i.price)), Math.max(...items.map((i) => i.price))];
  const [sliderValues, setsliderValues] = useState([priceRange[0], priceRange[1]]);
  const slideMarks = [
    {
      value: priceRange[0],
      label: `$${priceRange[0]}`,
    },
    {
      value: priceRange[1],
      label: `$${priceRange[1]}`,
    },
  ];
  const onFilterChange = (key, value, checked) => {
    if (checked) {
      setfilters([...filters, { key, value }]);
    } else {
      // remove the filter
      setfilters(filters.filter((f) => f.key !== key || f.value !== value));
    }
  };
  const onPriceChange = (event, value) => {
    setsliderValues(value);
  };
  return (
    <Box display="flex" justifyContent="flex-start" width={350} padding={3}>
      <Box display="flex" flexDirection="column" gap={3}>
        <SelectableList label="manufacturer" values={Array.from(manufacturers)} onFilterChange={onFilterChange} />
        <SelectableList label="color" values={Array.from(colors)} onFilterChange={onFilterChange} />
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography>Price</Typography>

          <Slider max={priceRange[1]} min={priceRange[0]} valueLabelDisplay="auto" sx={{ maxWidth: 250 }} size="small" onChange={onPriceChange} marks={slideMarks} value={sliderValues} valueLabelFormat={(x) => "$" + x.toLocaleString()} />
          <Box display="flex" justifyContent="space-around" paddingTop={2} gap={1}>
            <TextField id="standard-basic" label="Starting Price" onChange={(e) => setsliderValues([e.currentTarget.value, sliderValues[1]])} size="small" value={sliderValues[0]} />
            <Typography variant="body2">to</Typography>
            <TextField id="standard-basic" label="Maximum Price" onChange={(e) => setsliderValues([sliderValues[0], e.currentTarget.value])} size="small" value={sliderValues[1]} />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onApplyChanges(filters, sliderValues);
          }}
        >
          Apply filters
        </Button>
      </Box>
    </Box>
  );
};

export default LeftBar;

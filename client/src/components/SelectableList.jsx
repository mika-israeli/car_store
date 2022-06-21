import { Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/system";
const SelectableList = ({ label, values, onFilterChange }) => {
  const handleClick = () => {
    setopen(!open);
  };
  const handleFilterChange = (event) => {
    onFilterChange(label, event.target.value, event.target.checked);
  };
  const [open, setopen] = useState(false);
  return (
    <Box component="div" sx={{ maxWidth: 250, paddingLeft: 5 }}>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" sx={{ maxHeight: 340, overflow: "auto" }}>
        <FormControl component="fieldset">
          <FormGroup aria-label="filters">
            {values.map((item) => {
              return (
                <div>
                  <FormControlLabel sx={{ paddingLeft: "15px" }} value={item} control={<Checkbox />} label={item} labelPlacement="end" onChange={handleFilterChange} />
                  <Divider light />
                </div>
              );
            })}
          </FormGroup>
        </FormControl>
      </Collapse>
      <Divider sx={{ maxWidth: "200px" }} />
    </Box>
  );
};

export default SelectableList;

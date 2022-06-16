import { Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/system";
const SelectableList = () => {
  const handleClick = () => {
    setopen(!open);
  };
  const items = [
    {
      id: 1,
      text: "text1dddd",
      value: "text1",
    },
    {
      id: 2,
      text: "text2",
      value: "text2",
    },
    {
      id: 3,
      text: "text3",
      value: "text3",
    },
  ];
  const [open, setopen] = useState(false);
  return (
    <Box component="div" sx={{ maxWidth: 250 }}>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={"this is a test"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <FormControl component="fieldset">
          <FormGroup aria-label="filters">
            {items.map((item) => {
              return (
                <div>
                  <FormControlLabel sx={{ paddingLeft: "15px" }} value={item.value} control={<Checkbox />} label={item.text} labelPlacement="end" onChange={() => console.log(item.value)} />
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

import React from "react";
import Car from "./Car";
import { useState, useEffect } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
const CarFeed = ({ items }) => {
  const [sort, setSort] = useState("maker");
  const sortParameters = ["price", "maker", "year"];

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const [renderArray, setrenderArray] = useState(items);

  useEffect(() => {
    setrenderArray(items);
  }, [items]);
  useEffect(() => {
    const temp = [...renderArray];
    const sorted = temp.sort((a, b) => {
      if(a[sort] < b[sort]) {
        return -1;
      }
      if(a[sort] > b[sort]) {
        return 1;
      }
      return 0;
    });
    setrenderArray(sorted);
  }, [sort]);
  return (
    <Box>
      <Select value={sort} onChange={handleChange}>
        {sortParameters.map((param) => {
          return <MenuItem value={param}>{param}</MenuItem>;
        })}
      </Select>

      <Grid container justifyContent="center" spacing={3}>
        {renderArray.map((car) => {
          return (
            <Grid item>
              <Car item={car} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CarFeed;

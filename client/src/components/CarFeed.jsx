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
      if (a[sort] < b[sort]) {
        return -1;
      }
      if (a[sort] > b[sort]) {
        return 1;
      }
      return 0;
    });
    setrenderArray(sorted);
  }, [sort]);
  return (
    <div>
      <Select value={sort} onChange={handleChange}>
        {sortParameters.map((param) => {
          return <MenuItem value={param}>{param}</MenuItem>;
        })}
      </Select>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 0, maxWidth: "90%", alignItems: "flex-start", gap: "10px", justifyContent: "flex-start" }}>
        <Grid container justifyContent="center" spacing={3} padding={0} m={0}>
          {renderArray.map((car) => {
            return (
              <Grid item>
                <Car item={car} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default CarFeed;

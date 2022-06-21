import React from "react";
import Car from "./Car";
import { useState, useEffect } from "react";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import SideBar from "./SideBar";
const CarFeed = ({ items, openMenu }) => {
  const [sort, setSort] = useState("manufacturer");
  const sortParameters = ["price", "manufacturer", "year"];
  const [openFilter, setopenFilter] = useState(false);

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
      <Button
        onClick={() => {
          setopenFilter(!openFilter);
        }}
      >
        Filter
      </Button>
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
        {/* <SideBar isOpen={openFilter} /> */}
      </Box>
    </div>
  );
};
export default CarFeed;

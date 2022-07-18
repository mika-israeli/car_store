import React from "react";
import Car from "./Car";
import { useState, useEffect } from "react";
import { Button, Drawer, Grid, MenuItem, Pagination, Select } from "@mui/material";
import { Box } from "@mui/system";
import LeftBar from "./LeftBar";
import SearchBar from "./SearchBar";
import axios from "../api/axios";
const CarFeed = ({ items }) => {
  const [sort, setSort] = useState("manufacturer");
  const sortParameters = ["price - high to low", "price - low to high", "manufacturer", "year"];
  const [openFilter, setopenFilter] = useState(false);
  const [page, setpage] = useState(1);
  const PER_PAGE = 10;
  const [renderArray, setrenderArray] = useState([...items]);
  const [maxpages, setmaxpages] = useState(Math.ceil(items.length / PER_PAGE));
  const sortArray = (items) => {
    switch (sort) {
      case "price - high to low":
        return items.sort((a, b) => b.price - a.price);
      case "price - low to high":
        return items.sort((a, b) => a.price - b.price);
      case "manufacturer":
        return items.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
      case "year":
        return items.sort((a, b) => b.year - a.year);
      default:
        return items;
    }
  };
  const onFilterFromBackend = (filters, prices) => {
    axios
      .get("/cars", {
        params: {
          filters: JSON.stringify(filters),
          prices: JSON.stringify(prices),
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const onApplyChanges = (filters, prices) => {
    onFilterFromBackend(filters, prices);
    const filteredItems = items
      .filter((i) => {
        if (filters.length === 0) {
          return true;
        }
        return filters.some((f) => i[f.key] === f.value);
      })
      .filter((i) => i.price >= prices[0] && i.price <= prices[1]);
    setrenderArray(sortArray(filteredItems));
    setopenFilter(false);
    setpage(1);
  };
  const handlePageChange = (event, value) => {
    setpage(value);
  };
  // whenever the page changes, we need to update the renderArray and sort the items
  // useEffect(() => {
  //   const newArray = sortArray([...items]).splice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE);
  //   setrenderArray(newArray);
  // }, [page]);
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // useEffect(() => {
  //   setrenderArray([...items].splice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE));
  // }, [items]);
  useEffect(() => {
    setrenderArray(sortArray([...renderArray]));
  }, [sort]);
  const setSearchQuery = (event, query) => {
    //filter the items based on manufacturer or model
    event.preventDefault();
    const filteredItems = items.filter((i) => i.manufacturer.toLowerCase().includes(query.toLowerCase()) || i.model.toLowerCase().includes(query.toLowerCase()));
    setrenderArray(sortArray(filteredItems));
    setpage(1);
  };
  return (
    <Box component="div" display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="100vw" paddingTop={1}>
      <Box display="flex" justifyContent="space-between" width={"80%"} alignItems="flex-end">
        <Box display={"flex"} flexDirection="column" alignItems={"flex-start"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setopenFilter(!openFilter);
            }}
            size="small"
            flexGrow={0}
          >
            FILTERs
          </Button>
          Sort by:
          <Select value={sort} onChange={handleSortChange}>
            {sortParameters.map((param) => {
              return <MenuItem value={param}>{param}</MenuItem>;
            })}
          </Select>
        </Box>
      </Box>
      <SearchBar onSearch={setSearchQuery} />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 0, maxWidth: "80%", alignItems: "center", gap: "1px", justifyContent: "center" }}>
        <Grid container justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 5, md: 5 }}>
          {renderArray.map((car) => {
            return (
              <Grid item>
                <Car item={car} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* <Pagination count={maxpages} page={page} onChange={handlePageChange} /> */}

      <Drawer anchor="left" open={openFilter} onClose={() => setopenFilter(false)} sx={{ minWidth: 600 }}>
        <LeftBar items={items} onApplyChanges={onApplyChanges} />
      </Drawer>
    </Box>
  );
};
export default CarFeed;

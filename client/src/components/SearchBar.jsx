import { IconButton, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ setSearchQuery }) => {
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          console.log(e.currentTarget.value);
        }}
        label="Seach car"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search" onClick={(e) => e.preventDefault()}>
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
};

export default SearchBar;

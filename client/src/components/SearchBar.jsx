import { IconButton, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        onChange={(e) => {
          onSearch(e, e.target.value);
        }}
        label="Seach car"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      {/* <IconButton type="submit" aria-label="search" onClick={(e) => onSearch(e, searchQuery)}>
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton> */}
    </form>
  );
};

export default SearchBar;

import { AppBar, CssBaseline, Drawer, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CarFeed from "./CarFeed";
import SelectableList from "./SelectableList";

const LeftBar = ({ filters, search, items }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography>wow</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: 250, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box" } }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <SelectableList />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <CarFeed items={items} />
      </Box>
    </Box>
  );
};

export default LeftBar;

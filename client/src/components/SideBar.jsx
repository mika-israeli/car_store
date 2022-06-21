import { Drawer, styled, Typography } from "@mui/material";
import { Box, display } from "@mui/system";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState, useEffect } from "react";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideBar = ({ isOpen, setisOpen }) => {
  return (
    <Box component="div">
      <Drawer variant="persistent" hideBackdrop open={isOpen}>
        <DrawerHeader>
          <Typography>Apply filters</Typography>
          <ChevronLeftIcon onClick={() => setisOpen(false)} fontSize="large" />
        </DrawerHeader>
        <Box sx={{ width: 250, p: 20 }}></Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;

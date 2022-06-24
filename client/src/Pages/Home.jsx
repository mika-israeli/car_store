import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";
const Home = () => {
  const value = useContext(AuthContext);
  console.log(value);
  return (
    <Box component="main" sx={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
        Home
      </Typography>
      <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
        This is the home page
      </Typography>
    </Box>
  );
};

export default Home;

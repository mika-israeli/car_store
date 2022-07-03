import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import UserRecommendation from "../components/UserRecommendation.jsx";
import AuthContext from "../Context/AuthProvider";
const Home = () => {
  const value = useContext(AuthContext);
  console.log(value);
  return (
    <Box component="main" sx={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
        Welcome to our dealership
      </Typography>
      <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis ipsum distinctio corrupti molestias possimus doloribus consequatur sequi, aliquid iusto tempora tenetur, totam numquam quia repellendus inventore quos ex adipisci? Quas.
      </Typography>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/z4YQeGeNdPk"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Box>
  );
};

export default Home;

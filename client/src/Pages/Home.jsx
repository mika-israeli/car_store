import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import UserRecommendation from "../components/UserRecommendation.jsx";
import AuthContext from "../Context/AuthProvider";
import FacebookLogin from "react-facebook-login";
import { FacebookShareButton, FacebookIcon } from "react-share";
const Home = () => {
  const value = useContext(AuthContext);
  const responseFacebook = (response) => {
    console.log(response);
  };
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
      <FacebookLogin appId="730745804865220" callback={responseFacebook} fields="name,email,picture"></FacebookLogin>
      <FacebookShareButton url="https://www.facebook.com/Shop-730745804865220/?ref=pages_you_manage?quote=wow" quote="This is a test from facebook" hashtag="#shop">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </Box>
  );
};

export default Home;

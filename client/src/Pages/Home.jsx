import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import UserRecommendation from "../components/UserRecommendation.jsx";
import AuthContext from "../Context/AuthProvider";
import FacebookLogin from "react-facebook-login";
import { FacebookShareButton, FacebookIcon } from "react-share";
const Home = () => {
  const value = useContext(AuthContext);

  return (
    <Box width={"100%"} display="flex" justifyContent={"center"}>
      <Box display={"flex"} width={"50%"} flexDirection={"column"} alignItems="center" gap={5}>
        <Typography variant="h4" component="h1">
          Welcome to our dealership
        </Typography>
        <Typography variant="body1" component="h2">
          The Levy Car Agencies Agency has been in the automotive market since 1972, and has a great reputation of satisfied and returning customers. The Levi Agencies Car Dealership is located in the city of Rishon Lezion on 10 Lishansky Street in
          the new industrial zone in Rishon Letzion. The Levi Agencies Car Dealership specializes in selling cars from private ownership, and our vehicles at the dealership come from individuals. Cars from private ownership are vehicles that were not
          leased out or rented out by rental companies, and private vehicles are usually reserved better and treated better than vehicles that were in the various car companies. Here at Levi Agencies Car Dealership, you can find a variety of vehicles
          for sale, we hold all types of vehicles in our stock, such as private cars, mini cars, hybrid vehicles, commercial vehicles, manual vehicles, jeeps, work vehicles and more... There are many payment options available at the Levi Agencies Car
          Dealership: payment for the vehicle with checks, payment for the vehicle with a 100 percent financing, cash payment, direct debit payment, and, of course, bank transfer. At Levi Agencies Car Dealership, you can sell us your car, lease it
          out, or make a trade-in deal with it. All the vehicles we sell have warrantees according to the company's regulations and according to the type of vehicle purchased from us. If you have decided to sell or buy a car and / or carry out a
          trade-in deal for your car, you are invited to come to Levi Agencies Car Dealership and make a transaction that is convenient and reliable!{" "}
        </Typography>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3U7qUXPtXnA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default Home;

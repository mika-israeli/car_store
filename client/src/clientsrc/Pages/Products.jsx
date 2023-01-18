import React from "react";
import CarFeed from "../components/CarFeed";
import { useEffect } from "react";
import { useState } from "react";

import { Box } from "@mui/material";
import { useParams } from "react-router";
import axios from "../api/axios";

const Products = () => {
  const [cars, setcars] = useState("");
  let { type } = useParams();
  const url = `/cars`;
  useEffect(() => {
    const newurl = type === "all" ? url : `${url}/type/${type}`;
    axios
      .get(newurl)
      .then((res) => res.data)
      .then((data) => setcars(data))
      .then(() => console.log(cars))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const newurl = type === "all" ? url : `${url}/type/${type}`;
    axios
      .get(newurl)
      .then((res) => res.data)
      .then((data) => setcars(data))
      .then(() => console.log(cars));
  }, [type]);

  return (
    <Box display="flex" justifyContent="center" alignItems={"center"}>
      {cars && <CarFeed items={cars} />}
    </Box>
  );
};

export default Products;

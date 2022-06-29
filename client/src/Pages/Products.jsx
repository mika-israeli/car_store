import React from "react";
import CarFeed from "../components/CarFeed";
import { useEffect } from "react";
import { useState } from "react";
import LeftBar from "../components/LeftBar";
import { Box } from "@mui/material";

const Products = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      {data && <CarFeed items={data} />}
    </Box>
  );
};

export default Products;

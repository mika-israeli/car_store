import React from "react";
import CarFeed from "../components/CarFeed";
import { useEffect } from "react";
import { useState } from "react";
import LeftBar from "../components/LeftBar";
const Products = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }, []);

  return data && <LeftBar items={data} />;
};

export default Products;

import axios from "../api/axios";
import About from "./About";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const View = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://dummyjson.com/products/category/motorcycle"
      );
      setData(response.data.products);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "red",
        }}
      >
        <h1>products from api</h1>
        <Link to="/home">
          <button
            style={{
              //put the button in the left of the page
              display: "flex",
              flexDirection: "left",
              border: "3px solid purple",
              backgroundColor: "pink",
              color: "black",
            }}
          >
            home
          </button>
        </Link>
      </div>
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            style={{
              width: "100%",
              textAlign: "center",
              border: "1px solid black",
              backgroundColor: "lightblue",
              color: "blue",
            }}
          >
            <h1> item id: {item.id}</h1>
            <h2> item title: {item.title}</h2>
            <h3> item description: {item.description}</h3>
          </div>
        ))}
    </div>
  );
};

export default View;

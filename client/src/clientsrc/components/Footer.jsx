import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Call from "./call/Call";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Footer = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://api.nomics.com/v1/currencies/ticker?key=f906d4ab452426968881801f8f91ed1aa1cbc6b7&ids=BTC,ETH,XRP,LTC"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        console.log(Object.prototype.toString.apply(res.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <footer
      style={{
        background: "linear-gradient(to right bottom, #430089, white)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monospace",
        position: "sticky",
        bottom: 0,
        minHeight: "100px",
        width: "100%",
      }}
    >
      {/* <h2 style={{ color: 'white', fontWeight: 'bold' }}>Crypto Currency</h2> */}
      {data[0] && (
        <div className="footer">
          {data.map((item, index) => (
            <Card
              key={index}
              sx={{ minWidth: 200, maxHeight: 180, margin: "5px" }}
            >
              <CardMedia
                component="img"
                height="60"
                src={item["logo_url"]}
                alt="green iguana"
              />
              <CardContent>
                <div style={{ display: "flex", marginLeft: "1vw" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item["id"]}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    marginLeft="1vw"
                  >
                    {parseFloat(item["price"]).toFixed(3)}$
                  </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1" color="text.secondary">
                    <b>Date: </b>
                    {item["price_date"].slice(0, 10)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <b>Time: </b> {item["price_timestamp"].slice(11, -1)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Call
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </footer>
  );
};

export default Footer;

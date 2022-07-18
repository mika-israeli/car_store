import React, { Suspense } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";
const Contact = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA0O8293GBz-BD_laLxfx25nxnUr_oK284",
  });
  if (!isLoaded) return <Suspense>Loading</Suspense>;
  return <Map />;
};

const Map = () => {
  const [markers, setmarkers] = useState([]);
  useEffect(() => {
    axios.get("/markers").then((res) => {
      setmarkers(res.data);
    });
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100%" }} display="flex" justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Typography variant={"h4"}>Contact us</Typography>
      <Typography variant={"h6"}>
        Our address
        <Typography variant={"body2"}>Eli vizel 2, rishon lezion</Typography>
        <Typography variant={"body2"}>03-5555555</Typography>
      </Typography>
      {markers && (
        <GoogleMap zoom={15} center={{ lat: 31.970050939595765, lng: 34.772715385506295 }} mapContainerStyle={{ width: 500, height: 500 }}>
          {markers.map((marker) => (
            <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      )}
    </Box>
  );
};

export default Contact;

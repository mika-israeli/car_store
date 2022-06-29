import React, { Suspense } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";
const Contact = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA0O8293GBz-BD_laLxfx25nxnUr_oK284",
  });
  if (!isLoaded) return <Suspense>Loading</Suspense>;
  return <Map />;
};

const Map = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }} display="flex" justifyContent={"center"} align>
      our address:
      <GoogleMap zoom={15} center={{ lat: 31.970050939595765, lng: 34.772715385506295 }} mapContainerStyle={{ width: 500, height: 500 }}>
        {true && <Marker position={{ lat: 31.96886733101765, lng: 34.773501712968226 }} />}
      </GoogleMap>
    </Box>
  );
};

export default Contact;

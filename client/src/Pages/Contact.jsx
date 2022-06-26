import React, { Suspense } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const Contact = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA0O8293GBz-BD_laLxfx25nxnUr_oK284",
  });
  if (!isLoaded) return <Suspense>Loading</Suspense>;
  return <Map />;
};

const Map = () => {
  return (
    <GoogleMap zoom={15} center={{ lat: 31.970050939595765, lng: 34.772715385506295 }} mapContainerStyle={{ width: 500, height: 500 }}>
      <Marker position={{ lat: 31.970050939595765, lng: 34.772715385506295 }} />
    </GoogleMap>
  );
};

export default Contact;

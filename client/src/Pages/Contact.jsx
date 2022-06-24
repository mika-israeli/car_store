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
    <GoogleMap zoom={10} center={{ lat: 31.96850673973022, lng: 34.76463872140314 }} mapContainerStyle={{ width: 500, height: 500 }}>
      <Marker position={{ lat: 31.96850673973022, lng: 34.76463872140314 }} />
    </GoogleMap>
  );
};

export default Contact;

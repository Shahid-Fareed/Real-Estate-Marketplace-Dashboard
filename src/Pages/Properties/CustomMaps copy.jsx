import React from "react";
import GoogleMapReact from "google-map-react";

const CustomMaps = () => {
  const handleMarkerDragEnd = (event) => {
    const { lat, lng } = event;

    // Do something with the updated latitude and longitude values
    console.log("New Marker Position:", lat, lng);
  };

  const handleMapDragEnd = (event) => {
    const { center } = event;

    // Do something with the updated map center latitude and longitude values
    console.log("New Map Center:", center.lat, center.lng);
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB_X_leqFCrEXS06iTPXBW_DY3MPHM6RLQ" }}
        defaultCenter={{
          lat: 31.5089569,
          lng: 74.3433564,
        }}
        defaultZoom={14}
        draggable={true}
        onDragEnd={handleMapDragEnd}
      >
        <Marker
          lat={31.5089569}
          lng={74.3433564}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ lat, lng, draggable, onDragEnd }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "red",
    }}
    draggable={draggable}
    onDragEnd={(event) => onDragEnd(event)}
    lat={lat}
    lng={lng}
  />
);

export default CustomMaps;

//import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import axios from "axios";
import L from "leaflet";

import "../../assets/styles/components.css";

const Map = ({venue}) => {
  
   const layer = "precipitation_new"

  const fetchWeatherOverlay = async () => {
    const apiKey = import.meta.env.VITE_RapidAPI_Key;
    const url = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`;
  }

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<i class="fas fa-location-dot"></i>',
  });

  return (
    <div>

      <MapContainer
        center={[venue.latitude, venue.longitude]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[venue.latitude, venue.longitude]} icon={customIcon}>
          <Popup>
            <div className="card">
              <h3>{venue.ground}</h3>
              <h4>{venue.city}</h4>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

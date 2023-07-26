import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

import "../../assets/styles/components.css";

const Map = ({ venue }) => {
  const [weatherOverlay, setWeatherOverlay] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState("precipitation_new"); // Default selected layer

  const layers = [
    { value: "precipitation_new", label: "Precipitation" },
    // { value: "temp_new", label: "Temperature" },
    // Add more layers as needed
  ];

  const fetchWeatherOverlay = () => {
    const apiKey = "399a31ebf2dcefc84c5cf743172caaf6";
    const url = `https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${apiKey}`;

      setWeatherOverlay(url);
  };

  useEffect(() => {
    fetchWeatherOverlay();
  }, [selectedLayer]);

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<i class="fas fa-location-dot"></i>',
  });

  return (
    <div>
      <div className="layer-selector">
        {layers.map((layer) => (
          <label key={layer.value}>
            <input
              type="radio"
              value={layer.value}
              checked={selectedLayer === layer.value}
              onChange={() => setSelectedLayer(layer.value)}
            />
            {layer.label}
          </label>
        ))}
      </div>

      <MapContainer
        center={[venue.latitude, venue.longitude]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {weatherOverlay && <TileLayer url={weatherOverlay} />}

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

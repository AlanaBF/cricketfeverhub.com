import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "../../assets/styles/components.css";

// Create a custom marker icon with a Font Awesome icon
const customIcon = L.divIcon({
  className: "custom-icon",
  html: '<i class="fas fa-location-dot"></i>',
});

function Map({ venue }) {
  return (
    <MapContainer
      center={[venue.latitude, venue.longitude]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[venue.latitude, venue.longitude]}>
        <Popup>
          <div className="card">
            <h3>{venue.ground}</h3>
            <h4>{venue.city}</h4>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}


export default Map
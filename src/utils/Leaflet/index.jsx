import React from "react";
import "../../assets/styles/components.css";

function VenueCard({ venue }) {
  const { name, image, city, url, about } = venue;

  return (
    <div className="card">
      <div className="img-container">
        <img alt={name} src={image} className="shopImage" width="100%" />
      </div>
      <div className="content pt-3">
        <ul className="leaflet-card-ul"> 
        <div>
            <h3>{name}</h3>
          </div>
          <div>
            <h4>{city}</h4>
          </div>
          <div>
            <h4>{about}</h4>
          </div>
        </ul>
        <a href={url}></a>
      </div>
    </div>
  );
}

export default VenueCard;
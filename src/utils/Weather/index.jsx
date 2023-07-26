// https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}

function displayWeatherInfo(city) {
    var APIKey = "06049584939bfdb947b35800e5407bab";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var iconcode = response.list[0].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $(".weather-icon").attr("src", iconURL);
        var tempC = Math.floor(response.list[0].main.temp - 273.15);
        var wind = response.list[0].wind.speed;
        var humidity = response.list[0].main.humidity;


    //append the data to web application
    $("#temperature").text("Temp: " + tempC + "°C")
    $("#wind").text("Wind Speed: " + wind + "MPH")
    $("#humidity").text("Humidity: " + humidity + "%")





    }
    )
}


// import React, { useRef, useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import "../../assets/styles/components.css";

// // Create a custom marker icon with a Font Awesome icon
// const customIcon = L.divIcon({
//   className: "custom-icon",
//   html: '<i class="fas fa-location-dot"></i>',
// });

// function CricketMap({ venue }) {
//   const mapRef = useRef(null);
//   const [selectedLayer, setSelectedLayer] = useState('precipitation_new'); // Default layer

//   useEffect(() => {
//     // Initialize the map
//     const map = mapRef.current;

//     // Add the initial layer to the map
//     const VITE_RapidAPI_KeyWeather = import.meta.env.VITE_RapidAPI_KeyWeather;

//     L.tileLayer(`https://tile.openweathermap.org/map/${precipitation_new}/{z}/{x}/{y}.png?appid=${VITE_RapidAPI_KeyWeather}`, {
//       maxZoom: 19,
//       attribution: '© OpenWeatherMap contributors',
//     }).addTo(map);

//     // Add markers or other map features as needed

//     // Clean up the map when the component is unmounted
//     return () => {
//       map.remove();
//     };
//   }, [venue.latitude, venue.longitude, selectedLayer]);

//   const handleLayerChange = (layer) => {
//     setSelectedLayer(layer);
//   };

//   return (
//     <div>
//       {/* Map */}
//       <MapContainer
//         center={[venue.latitude, venue.longitude]}
//         zoom={15}
//         scrollWheelZoom={true}
//         ref={mapRef}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <Marker position={[venue.latitude, venue.longitude]}>
//           <Popup>
//             <div className="card">
//               <h3>{venue.ground}</h3>
//               <h4>{venue.city}</h4>
//               {/* Additional venue information */}
//             </div>
//           </Popup>
//         </Marker>
//       </MapContainer>

//       {/* Section box with layer selection */}
//       <div>
//         <h3>Select Layer:</h3>
//         <label>
//           <input
//             type="radio"
//             name="layer"
//             value="precipitation_new"
//             checked={selectedLayer === 'precipitation_new'}
//             onChange={() => handleLayerChange('precipitation_new')}
//           />
//           Precipitation
//         </label>
//       </div>
//     </div>
//   );
// };

// export default CricketMap;

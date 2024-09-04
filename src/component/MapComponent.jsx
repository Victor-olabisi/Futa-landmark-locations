import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [amenityPoints, setAmenityPoints] = useState(null);
  const [amenityPolygons, setAmenityPolygons] = useState(null);
  const [buildings, setBuildings] = useState(null);

  useEffect(() => {
    fetch("/geoJsondata/amenity_points.geojson")
      .then((response) => response.json())
      .then((data) => setAmenityPoints(data))
      .catch((error) => console.error("Error loading amenity points:", error));

    fetch("/geoJsondata/amenity_polygons.geojson")
      .then((response) => response.json())
      .then((data) => setAmenityPolygons(data))
      .catch((error) =>
        console.error("Error loading amenity polygons:", error)
      );

    fetch("/geoJsondata/buildings.geojson")
      .then((response) => response.json())
      .then((data) => setBuildings(data))
      .catch((error) => console.error("Error loading buildings:", error));
  }, []);

  return (
    // <div className="h-[400px]">

    <MapContainer
      center={[7.3066, 5.1376]}
      zoom={15}
      style={{ height: '65vh', width: "100%" }}
      className="rounded-xl"
    
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {amenityPoints && <GeoJSON data={amenityPoints} />}
      {amenityPolygons && <GeoJSON data={amenityPolygons} />}
      {buildings && <GeoJSON data={buildings} />}
    </MapContainer>
        // </div>
  );
};

export default MapComponent;

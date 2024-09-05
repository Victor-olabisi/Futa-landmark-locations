import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [amenityPoints, setAmenityPoints] = useState(null);
  const [amenityPolygons, setAmenityPolygons] = useState(null);
  const [buildings, setBuildings] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results

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

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = [];

    if (amenityPoints) {
      amenityPoints.features.forEach((feature) => {
        if (
          feature.properties.name &&
          feature.properties.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          results.push(feature);
        }
      });
    }

    if (amenityPolygons) {
      amenityPolygons.features.forEach((feature) => {
        if (
          feature.properties.name &&
          feature.properties.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          results.push(feature);
        }
      });
    }

    if (buildings) {
      buildings.features.forEach((feature) => {
        if (
          feature.properties.name &&
          feature.properties.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          results.push(feature);
        }
      });
    }

    setSearchResults(results);
  };

   const polygonStyle = {
     color: "none", // No border color
     fillOpacity: 0, // No fill
   };

  const SearchResults = () => {
    const map = useMap();

    useEffect(() => {
      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        const coordinates = firstResult.geometry.coordinates;

        // For Polygon and MultiPolygon geometry types, use the first coordinate
        if (
          firstResult.geometry.type === "Polygon" ||
          firstResult.geometry.type === "MultiPolygon"
        ) {
          map.flyTo([coordinates[0][0][1], coordinates[0][0][0]], 18);
        } else {
          map.flyTo([coordinates[1], coordinates[0]], 18);
        }
      }
    }, [searchResults, map]);

    return null;
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a location..."
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <MapContainer
        center={[7.3066, 5.1376]}
        zoom={30}
        style={{ height: "65vh", width: "100%" }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {amenityPoints && <GeoJSON data={amenityPoints} />}
        {amenityPolygons && (
          <GeoJSON data={amenityPolygons} style={polygonStyle} />
        )}
        {buildings && <GeoJSON data={buildings} />}
        <SearchResults />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

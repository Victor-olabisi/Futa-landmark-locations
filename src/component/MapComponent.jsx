import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = () => {
  const [amenityPoints, setAmenityPoints] = useState(null);
  const [amenityPolygons, setAmenityPolygons] = useState(null);
  const [buildings, setBuildings] = useState(null);
  const [roads, setRoads] = useState(null);
  const [landcover, setLandcover] = useState(null);

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

    fetch("/geoJsondata/roads.geojson")
      .then((response) => response.json())
      .then((data) => setRoads(data))
      .catch((error) => console.error("Error loading roads:", error));

    fetch("/geoJsondata/landcover.geojson")
      .then((response) => response.json())
      .then((data) => setLandcover(data))
      .catch((error) => console.error("Error loading landcover:", error));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setSearchResults([]);
      return;
    }

    const results = [];

    if (amenityPoints) {
      amenityPoints.features.forEach((feature) => {
        if (
          feature.properties.name &&
          feature.properties.name.toLowerCase().includes(value.toLowerCase())
        ) {
          results.push(feature);
        }
      });
    }

    if (amenityPolygons) {
      amenityPolygons.features.forEach((feature) => {
        if (
          feature.properties.name &&
          feature.properties.name.toLowerCase().includes(value.toLowerCase())
        ) {
          results.push(feature);
        }
      });
    }

    if (buildings) {
      buildings.features.forEach((feature) => {
        if (
          feature.properties.name &&
          feature.properties.name.toLowerCase().includes(value.toLowerCase())
        ) {
          results.push(feature);
        }
      });
    }

    setSearchResults(results);
  };

  // Define custom styles to remove fill and set transparent background for polygons
  const transparentPolygonStyle = {
    color: "#fff", // Optional border color, set to black
    weight: 1, // Border thickness
    fillOpacity: 0, // Make fill transparent
  };

  // A function to calculate the center of a polygon (for placing the marker on polygons)
  const getPolygonCenter = (coordinates) => {
    let totalLat = 0;
    let totalLng = 0;
    let count = 0;

    coordinates[0].forEach((coord) => {
      totalLat += coord[1];
      totalLng += coord[0];
      count++;
    });

    return [totalLat / count, totalLng / count];
  };

  const SearchResults = () => {
    const map = useMap();

    useEffect(() => {
      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        const coordinates = firstResult.geometry.coordinates;

        // For Polygon and MultiPolygon geometry types, fly to the first result
        if (
          firstResult.geometry.type === "Polygon" ||
          firstResult.geometry.type === "MultiPolygon"
        ) {
          const center = getPolygonCenter(coordinates);
          map.flyTo(center, 18);
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
        zoom={15}
        style={{ height: "65vh", width: "100%" }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Polygons with transparent style */}
        {amenityPolygons && (
          <GeoJSON data={amenityPolygons} style={transparentPolygonStyle} />
        )}

        {/* Buildings with transparent style */}
        {buildings && (
          <GeoJSON data={buildings} style={transparentPolygonStyle} />
        )}

        {/* Show markers only for the search results */}
        {searchResults.length > 0 &&
          searchResults.map((result, index) => {
            if (result.geometry.type === "Point") {
              // For Point geometry
              return (
                <Marker
                  key={index}
                  position={[
                    result.geometry.coordinates[1],
                    result.geometry.coordinates[0],
                  ]}
                >
                  <Popup>{result.properties.name}</Popup>
                </Marker>
              );
            } else if (
              result.geometry.type === "Polygon" ||
              result.geometry.type === "MultiPolygon"
            ) {
              // For Polygon or MultiPolygon, use the center for marker
              const center = getPolygonCenter(result.geometry.coordinates);
              return (
                <Marker key={index} position={center}>
                  <Popup>{result.properties.name}</Popup>
                </Marker>
              );
            } else {
              return null;
            }
          })}

        {/* Focus on search result */}
        <SearchResults />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

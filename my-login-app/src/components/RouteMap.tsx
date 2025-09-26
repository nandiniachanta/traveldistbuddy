import React, { useEffect, useState } from "react";
import { tspMemoized } from "../utils/tsp";

// Updated Coord type
export interface Coord {
  name: string; // location name
  lat: number;
  lng: number;
}

interface RouteMapProps {
  locations: string[];
}

const RouteMap: React.FC<RouteMapProps> = ({ locations }) => {
  const [coords, setCoords] = useState<Coord[]>([]);
  const [bestRoute, setBestRoute] = useState<Coord[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch coordinates whenever locations change
  useEffect(() => {
    const fetchCoords = async () => {
      const results: Coord[] = [];

      for (const loc of locations) {
        try {
          const res = await fetch(
            `http://localhost:5000/geocode?address=${encodeURIComponent(loc)}`
          );

          if (!res.ok) throw new Error(`Failed to fetch ${loc}`);

          const data = await res.json();
          results.push({ name: loc, lat: data.lat, lng: data.lng });
        } catch (err) {
          console.error(`Error fetching ${loc}:`, err);
          setError(`Failed to fetch coordinates for ${loc}`);
        }
      }

      setCoords(results);
    };

    if (locations.length > 0) fetchCoords();
  }, [locations]);

  // Run TSP whenever coordinates are ready
  useEffect(() => {
    if (coords.length < 2) return;

    try {
      const { path: bestPath } = tspMemoized(coords); // TSP still works on lat/lng
      setBestRoute(bestPath);
    } catch (err) {
      console.error("TSP calculation failed:", err);
      setError("TSP calculation failed");
    }
  }, [coords]);

  return (
    <div>
      <h2>Best Route</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && bestRoute.length > 0 && (
        <ol>
          {bestRoute.map((loc, i) => (
            <li key={i}>{loc.name}</li>
          ))}
        </ol>
      )}

      {!error && bestRoute.length === 0 && <p>Calculating route...</p>}
    </div>
  );
};

export default RouteMap;

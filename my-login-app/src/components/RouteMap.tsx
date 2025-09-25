import React, { useEffect, useState } from "react";
import { tspMemoized, Coord } from "../utils/tsp";

interface RouteMapProps {
  locations: string[];
}

const RouteMap: React.FC<RouteMapProps> = ({ locations }) => {
  const [coords, setCoords] = useState<Coord[]>([]);
  const [bestRoute, setBestRoute] = useState<Coord[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Debug: watch coords state
  useEffect(() => {
    console.log("coords state changed:", coords);
  }, [coords]);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        console.log("Fetching coordinates for locations:", locations);

        const geoResults: Coord[] = await Promise.all(
          locations.map(async (loc) => {
            const res = await fetch(
              `http://localhost:5000/geocode?address=${encodeURIComponent(loc)}`
            );

            if (!res.ok) {
              console.error(`Failed to fetch coordinates for "${loc}"`);
              throw new Error(`Failed to fetch: ${loc}`);
            }

            const data: Coord = await res.json();
            console.log(`Coordinates for "${loc}":`, data);
            return data;
          })
        );

        console.log("All coordinates fetched:", geoResults);

        geoResults.forEach((coord, i) => {
          if (!coord || typeof coord.lat !== "number" || typeof coord.lng !== "number") {
            console.error(`Invalid coordinate at index ${i}:`, coord);
          }
        });

        setCoords([...geoResults]); // shallow copy
        console.log("Coordinates state updated.");

        if (geoResults.length < 2) {
          console.warn("Not enough coordinates to compute TSP.");
          return;
        }

        console.log("Calling tspMemoized with coords:", geoResults);

        try {
          const { path: bestPath, minCost } = tspMemoized(geoResults);
          console.log("Best route calculated:", bestPath);
          console.log("Minimum distance (km):", minCost.toFixed(2));
          setBestRoute(bestPath);
        } catch (err) {
          console.error("Error in TSP calculation:", err);
          setError("TSP calculation failed.");
        }

      } catch (err) {
        console.error("Error fetching coordinates:", err);
        setError("Failed to fetch coordinates.");
      }
    };

    if (locations.length > 0) {
      fetchCoords();
    }
  }, [locations]);

  return (
    <div>
      <h2>Best Route</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : bestRoute.length > 0 ? (
        <pre>{JSON.stringify(bestRoute, null, 2)}</pre>
      ) : (
        <p>Calculating route...</p>
      )}
    </div>
  );
};

export default RouteMap;
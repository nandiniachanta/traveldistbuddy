
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { tspMemoized } from "../utils/tsp";

// ---------------- Coord type ----------------
export interface Coord {
    name: string;
    lat: number;
    lng: number;
}

// ---------------- FitBounds Component ----------------
const FitBounds: React.FC<{ coords: Coord[] }> = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords.length === 0) return;
        const bounds = coords.map(loc => [loc.lat, loc.lng]) as [number, number][];
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [coords, map]);

    return null;
};

// ---------------- RouteMap Component ----------------
interface RouteMapProps {
    locations: string[];
}

const RouteMap: React.FC<RouteMapProps> = ({ locations }) => {
    const [coords, setCoords] = useState<Coord[]>([]);
    const [bestRoute, setBestRoute] = useState<Coord[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch coordinates from backend
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

    const center: [number, number] =
        coords.length > 0 ? [coords[0].lat, coords[0].lng] : [20.5937, 78.9629]; // fallback: center of India

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <h2>Best Route</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!error && bestRoute.length > 0 && (
                <p>{bestRoute.map(loc => loc.name).join(" → ")}</p>
            )}

            {!error && bestRoute.length === 0 && <p>Calculating route...</p>}

            <MapContainer
                center={center}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    {...{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }}
                />

                {/* Fit map to route */}
                {bestRoute.length > 0 && <FitBounds coords={bestRoute} />}

                {/* Markers */}
                {bestRoute.map((loc, idx) => (
                    <Marker key={idx} position={[loc.lat, loc.lng]}>
                        <Popup>{idx + 1}. {loc.name}</Popup>
                    </Marker>
                ))}

                {/* Polyline connecting the route */}
                {bestRoute.length > 1 && (
                    <Polyline
                        positions={bestRoute.map(loc => [loc.lat, loc.lng])}
                        pathOptions={{ color: "blue", weight: 4, opacity: 0.7 }}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default RouteMap;

//import React from 'react';
//import { Card } from './ui/card';
//import { motion } from 'motion/react';
//import { MapPin, Navigation, Route } from 'lucide-react';

//interface MapViewProps {
//  destinations: string[];
//  startLocation: string;
//}

//export function MapView({ destinations, startLocation }: MapViewProps) {
//  const allLocations = [startLocation, ...destinations].filter(Boolean);

//  return (
//    <Card className="w-full h-96 md:h-[500px] rounded-2xl shadow-lg overflow-hidden">
//      <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
//        {/* Map Placeholder */}
//        <div className="absolute inset-0 opacity-10">
//          <svg className="w-full h-full" viewBox="0 0 400 300">
//            {/* Grid lines to simulate map */}
//            <defs>
//              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
//              </pattern>
//            </defs>
//            <rect width="100%" height="100%" fill="url(#grid)" />
//          </svg>
//        </div>

//        {/* Map Content */}
//        <div className="relative z-10 text-center">
//          <div className="mb-4">
//            <Navigation className="w-16 h-16 mx-auto text-blue-500 mb-4" />
//            <h3 className="text-xl mb-2">Interactive Map View</h3>
//            <p className="text-muted-foreground">
//              {allLocations.length > 0 
//                ? `Route with ${allLocations.length} location${allLocations.length !== 1 ? 's' : ''}`
//                : 'Add locations to see your route'
//              }
//            </p>
//          </div>

//          {/* Location Markers Simulation */}
//          {allLocations.length > 0 && (
//            <motion.div 
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              className="flex flex-wrap justify-center gap-4 mt-6"
//            >
//              {allLocations.map((location, index) => (
//                <motion.div
//                  key={index}
//                  initial={{ opacity: 0, scale: 0 }}
//                  animate={{ opacity: 1, scale: 1 }}
//                  transition={{ delay: index * 0.2, type: "spring" }}
//                  whileHover={{ scale: 1.1 }}
//                  className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-shadow"
//                >
//                  <motion.div 
//                    className={`w-3 h-3 rounded-full ${
//                      index === 0 
//                        ? 'bg-green-500' 
//                        : index === allLocations.length - 1 
//                          ? 'bg-red-500' 
//                          : 'bg-blue-500'
//                    }`}
//                    animate={{ 
//                      scale: [1, 1.2, 1],
//                      boxShadow: [
//                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
//                        "0 0 0 10px rgba(59, 130, 246, 0)",
//                        "0 0 0 0 rgba(59, 130, 246, 0)"
//                      ]
//                    }}
//                    transition={{ 
//                      duration: 2, 
//                      repeat: Infinity,
//                      delay: index * 0.5 
//                    }}
//                  />
//                  <span className="text-sm truncate max-w-24">
//                    {location || `Stop ${index + 1}`}
//                  </span>
//                </motion.div>
//              ))}
//            </motion.div>
//          )}

//          {/* Route Line Simulation */}
//          {allLocations.length > 1 && (
//            <motion.div 
//              initial={{ opacity: 0 }}
//              animate={{ opacity: 1 }}
//              transition={{ delay: 0.5 }}
//              className="mt-4"
//            >
//              <div className="flex items-center justify-center">
//                <motion.div 
//                  className="h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-red-500 rounded-full opacity-70"
//                  initial={{ width: 0 }}
//                  animate={{ width: 128 }}
//                  transition={{ duration: 1, ease: "easeInOut" }}
//                />
//              </div>
//              <motion.div
//                initial={{ opacity: 0, y: 10 }}
//                animate={{ opacity: 1, y: 0 }}
//                transition={{ delay: 1 }}
//                className="flex items-center justify-center mt-2"
//              >
//                <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                  <Route className="w-3 h-3" />
//                  Optimized Route
//                </div>
//              </motion.div>
//            </motion.div>
//          )}
//        </div>

//        {/* Map Controls */}
//        <div className="absolute top-4 right-4 flex flex-col gap-2">
//          <button className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//            <MapPin className="w-4 h-4" />
//          </button>
//          <button className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//            <span className="text-sm">+</span>
//          </button>
//          <button className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//            <span className="text-sm">-</span>
//          </button>
//        </div>
//      </div>
//    </Card>
//  );
//}


import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Coord } from "../utils/tsp"; // reuse your Coord type
import { Card } from "./ui/card";

// FitBounds helper
const FitBounds: React.FC<{ coords: Coord[] }> = ({ coords }) => {
    const map = useMap();
    React.useEffect(() => {
        if (coords.length === 0) return;
        const bounds = coords.map(c => [c.lat, c.lng]) as [number, number][];
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [coords, map]);
    return null;
};

interface MapViewProps {
    bestRoute: Coord[]; // already in order of travel
}

export function MapView({ bestRoute }: MapViewProps) {
    const center: [number, number] =
        bestRoute.length > 0 ? [bestRoute[0].lat, bestRoute[0].lng] : [20.5937, 78.9629]; // fallback India center

    return (
        <Card className="w-full h-96 md:h-[500px] rounded-2xl shadow-lg overflow-hidden">
            <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {bestRoute.length > 0 && <FitBounds coords={bestRoute} />}

                {/* Markers */}
                {bestRoute.map((loc, idx) => (
                    <Marker key={idx} position={[loc.lat, loc.lng]}>
                        <Popup>{idx + 1}. {loc.name}</Popup>
                    </Marker>
                ))}

                {/* Polyline */}
                {bestRoute.length > 1 && (
                    <Polyline
                        positions={bestRoute.map(loc => [loc.lat, loc.lng])}
                        pathOptions={{ color: "blue", weight: 4, opacity: 0.7 }}
                    />
                )}
            </MapContainer>
        </Card>
    );
}

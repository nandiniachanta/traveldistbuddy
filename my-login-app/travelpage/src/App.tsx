import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TripPlannerForm } from './components/TripPlannerForm';
import { MapView } from './components/MapView';
import { WeatherWidget } from './components/WeatherWidget';
import { PastSearches } from './components/PastSearches';
import { TripStats } from './components/TripStats';
import { AboutSection } from './components/AboutSection';
import { TravelTips } from './components/TravelTips';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import RouteMap, { Coord } from './components/RouteMap';
import { tspMemoized , haversine} from "./utils/tsp";


interface TripData {
  startLocation: string;
  destinations: Array<{ id: string; location: string }>;
  travelMode: string;
}

interface PastSearch {
  id: string;
  route: string;
  date: string;
  duration: string;
  distance: string;
  startLocation: string;
  destinations: string[];
  travelMode: string;
}

export default function App() {
    const [coords, setCoords] = useState<Coord[]>([]);
    const [optimizedRoute, setOptimizedRoute] = useState<Coord[]>([]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('plan');
  const [tripData, setTripData] = useState<TripData>({
    startLocation: '',
    destinations: [],
    travelMode: 'driving'
  });
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [pastSearches, setPastSearches] = useState<PastSearch[]>([]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load past searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('travelDistBuddy_pastSearches');
    if (savedSearches) {
      try {
        setPastSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Error loading past searches:', error);
      }
    }
  }, []);

  // Save past searches to localStorage
  const savePastSearches = (searches: PastSearch[]) => {
    try {
      localStorage.setItem('travelDistBuddy_pastSearches', JSON.stringify(searches));
      setPastSearches(searches);
    } catch (error) {
      console.error('Error saving past searches:', error);
    }
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  //const handleOptimizeRoute = (data: any) => {
  //  setIsOptimizing(true);
  //  setIsOptimized(false);

  //  // Simulate optimization delay
  //  setTimeout(() => {
  //    setTripData(data);
  //    setIsOptimized(true);
  //    setIsOptimizing(false);

  //  // Create route string
  //  const destinations = data.destinations.filter((dest: any) => dest.location.trim() !== '');
  //  const routeString = destinations.length > 0
  //    ? `${data.startLocation} → ${destinations.map((d: any) => d.location).join(' → ')}`
  //    : data.startLocation;

  //  // Calculate mock statistics
  //  const destCount = destinations.length + 1; // Include start location
  //  let baseDistance = destCount * 120;
  //  let baseTime = destCount * 2;
  //  let baseCost = 0;

  //  switch (data.travelMode) {
  //    case 'driving':
  //      baseCost = baseDistance * 0.56;
  //      break;
  //    case 'walking':
  //      baseDistance = Math.floor(baseDistance * 0.1);
  //      baseTime = baseDistance * 0.3;
  //      baseCost = 0;
  //      break;
  //    case 'transit':
  //      baseCost = destCount * 25;
  //      baseTime = baseTime * 1.5;
  //      break;
  //  }

  //  // Apply optimization
  //  baseDistance = Math.floor(baseDistance * 0.85);
  //  baseTime = Math.floor(baseTime * 0.9);
  //  baseCost = Math.floor(baseCost * 0.88);

  //  // Create new past search entry
  //  const newSearch: PastSearch = {
  //    id: Date.now().toString(),
  //    route: routeString,
  //    date: new Date().toISOString(),
  //    duration: `${Math.floor(baseTime)}h ${Math.floor((baseTime % 1) * 60)}m`,
  //    distance: `${baseDistance} mi`,
  //    startLocation: data.startLocation,
  //    destinations: destinations.map((d: any) => d.location),
  //    travelMode: data.travelMode
  //  };

  //  // Add to past searches (keep only last 10)
  //  const updatedSearches = [newSearch, ...pastSearches].slice(0, 10);
  //  savePastSearches(updatedSearches);

  //    // Simulate optimization process
  //    console.log('Route optimized!', data);
  //  }, 2000); // Increased delay for better UX
  //};
    const handleOptimizeRoute = async (data: any) => {
        setIsOptimizing(true);
        setIsOptimized(false);

        try {
            const locations = [
                data.startLocation,
                ...data.destinations.map((d: any) => d.location),
            ];

            const API_BASE = "https://traveldistbuddy.onrender.com"
            console.log("API_BASE:", API_BASE);

            const results: Coord[] = [];

            for (const loc of locations) {
                try {

                    console.log({ API_BASE });
                    const res = await fetch(
                        `${API_BASE}/geocode?address=${encodeURIComponent(loc)}`
                    );

                    if (!res.ok) throw new Error(`Failed to fetch ${loc}`);

                    const data = await res.json();
                    results.push({ name: loc, lat: data.lat, lng: data.lng });
                } catch (err) {
                    console.error(`Error fetching ${loc}:`, err);
                    console.log(`Failed to fetch coordinates for ${loc}`);
                }
            }

            setCoords(results);

            setCoords(results);

            // Run TSP
            const { path: bestPath } = tspMemoized(results);
            setOptimizedRoute(bestPath);

            setIsOptimized(true);
            setTripData(data);

            // Save past searches
            const routeString = bestPath.map((c) => c.name).join(" → ");
            const newSearch: PastSearch = {
                id: Date.now().toString(),
                route: routeString,
                date: new Date().toISOString(),
                duration: `${bestPath.length * 2}h`,
                distance: `${Math.floor(
                    bestPath.reduce((sum, c, i) => {
                        if (i === 0) return 0;
                        return sum + haversine(bestPath[i - 1], c);
                    }, 0)
                )} km`,
                startLocation: data.startLocation,
                destinations: data.destinations.map((d: any) => d.location),
                travelMode: data.travelMode,
            };

            const updatedSearches = [newSearch, ...pastSearches].slice(0, 10);
            savePastSearches(updatedSearches);

        } catch (err) {
            console.error("Optimization failed:", err);
        } finally {
            setIsOptimizing(false);
        }
    };


  //////////

  const handleViewSearch = (search: PastSearch) => {
    // Load the search back into the form
    setTripData({
      startLocation: search.startLocation,
      destinations: search.destinations.map((dest, index) => ({
        id: (index + 1).toString(),
        location: dest
      })),
      travelMode: search.travelMode
    });
    setIsOptimized(true);
    setActiveSection('plan');
  };

  const handleDeleteSearch = (searchId: string) => {
    const updatedSearches = pastSearches.filter(search => search.id !== searchId);
    savePastSearches(updatedSearches);
  };

  // Get destination locations for other components
  const destinationLocations = tripData.destinations.map(dest => dest.location);
  
  // Prepare optimized data for sharing
  const optimizedTripData = isOptimized ? {
    startLocation: tripData.startLocation,
    destinations: destinationLocations,
    travelMode: tripData.travelMode,
    duration: '8h 30m', // Mock data - would come from optimization
    distance: '520 mi'   // Mock data - would come from optimization
  } : null;

  const renderMainContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto">
            <AboutSection />
          </div>
        );
      
      case 'history':
        return (
          <div className="max-w-4xl mx-auto">
            <PastSearches 
              pastSearches={pastSearches}
              onViewSearch={handleViewSearch}
              onDeleteSearch={handleDeleteSearch}
            />
          </div>
        );
      
      case 'plan':
      case 'home':
      default:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content - Trip Planner and Map */}
            <div className="xl:col-span-2 space-y-6 lg:space-y-8">
              <TripPlannerForm 
                onOptimizeRoute={handleOptimizeRoute}
                isOptimizing={isOptimizing}
                optimizedData={optimizedTripData}
              />
              <MapView 
                        bestRoute={optimizedRoute}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <WeatherWidget 
                destinations={destinationLocations} 
                startLocation={tripData.startLocation}
              />
              <TripStats 
                destinations={destinationLocations}
                travelMode={tripData.travelMode}
                isOptimized={isOptimized}
              />
              <TravelTips
                destinations={destinationLocations}
                travelMode={tripData.travelMode}
                isOptimized={isOptimized}
              />
              <div className="xl:hidden">
                <PastSearches 
                  pastSearches={pastSearches}
                  onViewSearch={handleViewSearch}
                  onDeleteSearch={handleDeleteSearch}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={handleToggleDarkMode}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {renderMainContent()}
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { TripTemplates } from './TripTemplates';
import { ShareTrip } from './ShareTrip';
import { LoadingSpinner, RouteOptimizingLoader } from './LoadingSpinner';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Plus, Trash2, Car, User, Bus, Wand2, ChevronDown } from 'lucide-react';

interface Destination {
  id: string;
  location: string;
}

interface TripPlannerFormProps {
  onOptimizeRoute: (data: any) => void;
  isOptimizing?: boolean;
  optimizedData?: any;
}

export function TripPlannerForm({ onOptimizeRoute, isOptimizing = false, optimizedData }: TripPlannerFormProps) {
  const [startLocation, setStartLocation] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: '1', location: '' }
  ]);
  const [travelMode, setTravelMode] = useState('driving');
  const [showTemplates, setShowTemplates] = useState(false);

  const addDestination = () => {
    const newId = (destinations.length + 1).toString();
    setDestinations([...destinations, { id: newId, location: '' }]);
  };

  const removeDestination = (id: string) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter(dest => dest.id !== id));
    }
  };

  const updateDestination = (id: string, location: string) => {
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, location } : dest
    ));
  };

  const handleOptimizeRoute = () => {
    const data = {
      startLocation,
      destinations: destinations.filter(dest => dest.location.trim() !== ''),
      travelMode
    };
    onOptimizeRoute(data);
  };

  const handleSelectTemplate = (template: any) => {
    setStartLocation('Current Location');
    setDestinations(template.destinations.map((dest: string, index: number) => ({
      id: (index + 1).toString(),
      location: dest
    })));
    setTravelMode(template.travelMode);
    setShowTemplates(false);
  };

  const travelModes = [
    { id: 'driving', label: 'Driving', icon: Car, emoji: '🚗' },
    { id: 'walking', label: 'Walking', icon: User, emoji: '🚶' },
    { id: 'transit', label: 'Transit', icon: Bus, emoji: '🚌' }
  ];

  const isFormValid = startLocation.trim() !== '' && destinations.some(dest => dest.location.trim() !== '');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Plan Your Multi-Destination Trip
          </div>
          {optimizedData && (
            <ShareTrip tripData={optimizedData} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Templates */}
        <Collapsible open={showTemplates} onOpenChange={setShowTemplates}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
              type="button"
            >
              <span className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Quick Start Templates
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <TripTemplates onSelectTemplate={handleSelectTemplate} />
          </CollapsibleContent>
        </Collapsible>
        {/* Start Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <Label htmlFor="start-location">Start Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="start-location"
              placeholder="Enter your starting location..."
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </motion.div>

        {/* Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <Label>Destinations</Label>
          <div className="space-y-3">
            <AnimatePresence>
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={`Destination ${index + 1}...`}
                      value={destination.location}
                      onChange={(e) => updateDestination(destination.id, e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  {destinations.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeDestination(destination.id)}
                      className="shrink-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                variant="outline"
                onClick={addDestination}
                className="w-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Destination
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Travel Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <Label>Travel Mode</Label>
          <div className="grid grid-cols-3 gap-3">
            {travelModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant={travelMode === mode.id ? "default" : "outline"}
                  onClick={() => setTravelMode(mode.id)}
                  className={`flex flex-col items-center gap-2 h-auto py-4 w-full transition-all duration-200 ${
                    travelMode === mode.id 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-muted/70'
                  }`}
                >
                  <span className="text-2xl">{mode.emoji}</span>
                  <span>{mode.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Optimize Route Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: isFormValid ? 1.02 : 1 }}
          whileTap={{ scale: isFormValid ? 0.98 : 1 }}
        >
          <Button
            onClick={handleOptimizeRoute}
            disabled={!isFormValid || isOptimizing}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {isOptimizing ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" className="text-white" />
                Optimizing Route...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Optimize Route
              </div>
            )}
          </Button>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isOptimizing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <RouteOptimizingLoader />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
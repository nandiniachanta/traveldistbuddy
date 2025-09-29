import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Cloud, Sun, CloudRain, Snowflake, Wind, RefreshCw, Info } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherWidgetProps {
  destinations: string[];
  startLocation: string;
}

export function WeatherWidget({ destinations, startLocation }: WeatherWidgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Get all locations including start location
  const allLocations = [startLocation, ...destinations].filter(location => location.trim() !== '');

  // Mock weather data with more realistic information
  const generateWeatherData = (location: string, index: number): WeatherData => {
    const weatherConditions = [
      { icon: 'Sun', description: 'Sunny', tempRange: [20, 35] },
      { icon: 'Cloud', description: 'Partly Cloudy', tempRange: [15, 25] },
      { icon: 'CloudRain', description: 'Light Rain', tempRange: [10, 20] },
      { icon: 'Snowflake', description: 'Snow', tempRange: [-5, 5] },
      { icon: 'Wind', description: 'Windy', tempRange: [12, 22] }
    ];

    const condition = weatherConditions[index % weatherConditions.length];
    const temperature = Math.floor(Math.random() * (condition.tempRange[1] - condition.tempRange[0] + 1)) + condition.tempRange[0];
    
    return {
      location: location || `Location ${index + 1}`,
      temperature,
      description: condition.description,
      icon: condition.icon,
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
    };
  };

  const mockWeatherData: WeatherData[] = allLocations
    .slice(0, 5) // Limit to 5 locations
    .map((location, index) => generateWeatherData(location, index));

  const refreshWeather = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  useEffect(() => {
    if (allLocations.length > 0 && !lastUpdated) {
      setLastUpdated(new Date());
    }
  }, [allLocations.length, lastUpdated]);

  if (allLocations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Cloud className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-2">No locations added yet</p>
            <p className="text-xs text-muted-foreground">
              Add your start location and destinations to see current weather conditions
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = (iconName: string, temperature: number) => {
    const iconColor = temperature > 25 ? 'text-orange-500' : 
                     temperature > 15 ? 'text-yellow-500' : 
                     temperature > 5 ? 'text-blue-500' : 'text-blue-300';

    switch (iconName) {
      case 'Sun': return <Sun className={`w-6 h-6 ${iconColor}`} />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'CloudRain': return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'Snowflake': return <Snowflake className="w-6 h-6 text-blue-300" />;
      case 'Wind': return <Wind className="w-6 h-6 text-gray-600" />;
      default: return <Sun className={`w-6 h-6 ${iconColor}`} />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Weather Forecast
          </div>
          <button 
            onClick={refreshWeather}
            disabled={isLoading}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </CardTitle>
        {lastUpdated && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="w-3 h-3" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockWeatherData.map((weather, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(weather.icon, weather.temperature)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm truncate max-w-24">{weather.location}</p>
                      {index === 0 && (
                        <Badge variant="outline" className="text-xs h-5">Start</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{weather.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg">{weather.temperature}°C</p>
                </div>
              </div>
              
              {/* Additional weather details */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>💧 {weather.humidity}%</span>
                <span>💨 {weather.windSpeed} km/h</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Weather helps you plan appropriate travel gear and timing for each destination
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
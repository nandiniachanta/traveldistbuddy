import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart3, MapPin, Clock, DollarSign } from 'lucide-react';

interface TripStatsProps {
  destinations: string[];
  travelMode: string;
  isOptimized: boolean;
}

export function TripStats({ destinations, travelMode, isOptimized }: TripStatsProps) {
  // Mock calculations based on destinations and travel mode
  const calculateStats = () => {
    const destCount = destinations.filter(dest => dest.trim() !== '').length;
    
    if (destCount === 0) {
      return {
        totalDistance: '0 mi',
        estimatedTime: '0h 0m',
        estimatedCost: '$0'
      };
    }

    // Mock calculations
    let baseDistance = destCount * 120; // 120 miles per destination on average
    let baseTime = destCount * 2; // 2 hours per destination on average
    let baseCost = 0;

    switch (travelMode) {
      case 'driving':
        baseCost = baseDistance * 0.56; // IRS mileage rate
        break;
      case 'walking':
        baseDistance = Math.floor(baseDistance * 0.1); // Walking is much shorter distances
        baseTime = baseDistance * 0.3; // 20 min per mile walking
        baseCost = 0; // Free
        break;
      case 'transit':
        baseCost = destCount * 25; // $25 per segment
        baseTime = baseTime * 1.5; // Transit takes longer
        break;
    }

    // Apply optimization bonus
    if (isOptimized) {
      baseDistance = Math.floor(baseDistance * 0.85); // 15% distance reduction
      baseTime = Math.floor(baseTime * 0.9); // 10% time reduction
      baseCost = Math.floor(baseCost * 0.88); // 12% cost reduction
    }

    return {
      totalDistance: `${baseDistance} mi`,
      estimatedTime: `${Math.floor(baseTime)}h ${Math.floor((baseTime % 1) * 60)}m`,
      estimatedCost: travelMode === 'walking' ? 'Free' : `$${Math.floor(baseCost)}`
    };
  };

  const stats = calculateStats();

  const statsData = [
    {
      icon: MapPin,
      label: 'Total Distance',
      value: stats.totalDistance,
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: 'Estimated Time',
      value: stats.estimatedTime,
      color: 'text-green-500'
    },
    {
      icon: DollarSign,
      label: 'Estimated Cost',
      value: stats.estimatedCost,
      color: 'text-purple-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Trip Statistics
          {isOptimized && (
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              Optimized
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statsData.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm">{stat.label}</span>
              </div>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>

        {destinations.filter(dest => dest.trim() !== '').length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {isOptimized 
                ? '✅ Route optimized for best efficiency'
                : '💡 Click "Optimize Route" to improve these stats'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
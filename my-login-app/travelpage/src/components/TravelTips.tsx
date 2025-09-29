import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Clock, 
  DollarSign, 
  MapPin, 
  Fuel, 
  Coffee,
  Camera,
  Shield,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface TravelTip {
  id: string;
  type: 'cost' | 'time' | 'safety' | 'experience';
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  actionable: boolean;
}

interface TravelTipsProps {
  destinations: string[];
  travelMode: string;
  isOptimized: boolean;
}

export function TravelTips({ destinations, travelMode, isOptimized }: TravelTipsProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const generateTips = (): TravelTip[] => {
    const tips: TravelTip[] = [];

    // Base tips for all trips
    if (destinations.length > 2) {
      tips.push({
        id: 'multi-stop',
        type: 'time',
        icon: Clock,
        title: 'Multi-Stop Efficiency',
        description: 'Plan bathroom breaks and meals at strategic stops to save time',
        actionable: true
      });
    }

    // Travel mode specific tips
    if (travelMode === 'driving') {
      tips.push(
        {
          id: 'fuel-up',
          type: 'cost',
          icon: Fuel,
          title: 'Fuel Optimization',
          description: 'Fill up at the cheapest station along your route using gas apps',
          actionable: true
        },
        {
          id: 'traffic-timing',
          type: 'time',
          icon: Clock,
          title: 'Avoid Rush Hours',
          description: 'Start early morning or after 7 PM to skip traffic jams',
          actionable: true
        }
      );
    }

    if (travelMode === 'walking') {
      tips.push(
        {
          id: 'comfortable-shoes',
          type: 'experience',
          icon: Shield,
          title: 'Comfort First',
          description: 'Wear comfortable walking shoes and bring water bottles',
          actionable: true
        },
        {
          id: 'photo-spots',
          type: 'experience',
          icon: Camera,
          title: 'Photo Opportunities',
          description: 'Walking allows you to discover hidden gems for great photos',
          actionable: false
        }
      );
    }

    if (travelMode === 'transit') {
      tips.push(
        {
          id: 'transit-apps',
          type: 'time',
          icon: MapPin,
          title: 'Transit Apps',
          description: 'Download local transit apps for real-time updates and delays',
          actionable: true
        },
        {
          id: 'day-pass',
          type: 'cost',
          icon: DollarSign,
          title: 'Day Pass Savings',
          description: 'Buy a day pass if visiting 3+ destinations via public transport',
          actionable: true
        }
      );
    }

    // Destination count specific tips
    if (destinations.length >= 4) {
      tips.push({
        id: 'energy-management',
        type: 'experience',
        icon: Coffee,
        title: 'Energy Management',
        description: 'Schedule coffee breaks between stops 3 and 4 to maintain energy',
        actionable: true
      });
    }

    // Optimization specific tips
    if (isOptimized) {
      tips.push({
        id: 'optimized-bonus',
        type: 'cost',
        icon: Sparkles,
        title: 'Optimized Route Benefits',
        description: 'Your route is now 15% more efficient - save time and money!',
        actionable: false
      });
    }

    // Weather-based tips (mock)
    tips.push({
      id: 'weather-prep',
      type: 'safety',
      icon: Shield,
      title: 'Weather Preparedness',
      description: 'Check weather forecasts and pack accordingly for all destinations',
      actionable: true
    });

    return tips;
  };

  const tips = generateTips();

  // Auto-cycle through tips
  useEffect(() => {
    if (tips.length > 1 && !showAll) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [tips.length, showAll]);

  if (tips.length === 0) {
    return null;
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cost': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'time': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'safety': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'experience': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'cost': return 'bg-green-500/10 text-green-700 dark:text-green-300';
      case 'time': return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'safety': return 'bg-orange-500/10 text-orange-700 dark:text-orange-300';
      case 'experience': return 'bg-purple-500/10 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Smart Travel Tips
          </div>
          {tips.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `View All (${tips.length})`}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {showAll ? (
            <motion.div
              key="all-tips"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={`p-2 rounded-lg ${getTypeColor(tip.type)}`}>
                    {React.createElement(tip.icon, { className: "w-4 h-4" })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{tip.title}</span>
                      <Badge className={`text-xs ${getTypeBadgeColor(tip.type)}`}>
                        {tip.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                  </div>
                  {tip.actionable && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`tip-${currentTipIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className={`p-2 rounded-lg ${getTypeColor(tips[currentTipIndex].type)}`}>
                {React.createElement(tips[currentTipIndex].icon, { className: "w-4 h-4" })}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{tips[currentTipIndex].title}</span>
                  <Badge className={`text-xs ${getTypeBadgeColor(tips[currentTipIndex].type)}`}>
                    {tips[currentTipIndex].type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tips[currentTipIndex].description}</p>
              </div>
              {tips[currentTipIndex].actionable && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!showAll && tips.length > 1 && (
          <div className="flex justify-center mt-3 gap-1">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTipIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
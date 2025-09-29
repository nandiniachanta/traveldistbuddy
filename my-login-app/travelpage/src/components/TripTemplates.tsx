import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Camera, 
  ShoppingBag, 
  UtensilsCrossed, 
  Building, 
  Plane,
  MapPin,
  Clock
} from 'lucide-react';

interface TripTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  destinations: string[];
  travelMode: string;
  estimatedTime: string;
  color: string;
}

interface TripTemplatesProps {
  onSelectTemplate: (template: TripTemplate) => void;
}

export function TripTemplates({ onSelectTemplate }: TripTemplatesProps) {
  const templates: TripTemplate[] = [
    {
      id: 'business',
      name: 'Business Trip',
      description: 'Efficient route for corporate meetings',
      icon: Briefcase,
      destinations: ['Downtown Office', 'Business District', 'Conference Center'],
      travelMode: 'driving',
      estimatedTime: '4-6 hours',
      color: 'text-blue-500'
    },
    {
      id: 'sightseeing',
      name: 'City Sightseeing',
      description: 'Popular tourist attractions',
      icon: Camera,
      destinations: ['Museum', 'Historic Downtown', 'City Park', 'Viewpoint'],
      travelMode: 'walking',
      estimatedTime: '6-8 hours',
      color: 'text-green-500'
    },
    {
      id: 'shopping',
      name: 'Shopping Tour',
      description: 'Best shopping districts and malls',
      icon: ShoppingBag,
      destinations: ['Shopping Mall', 'Outlet Center', 'Local Market'],
      travelMode: 'driving',
      estimatedTime: '3-5 hours',
      color: 'text-purple-500'
    },
    {
      id: 'foodie',
      name: 'Food Trail',
      description: 'Culinary adventure across the city',
      icon: UtensilsCrossed,
      destinations: ['Famous Restaurant', 'Food Market', 'Local Cafe', 'Dessert Shop'],
      travelMode: 'driving',
      estimatedTime: '5-7 hours',
      color: 'text-orange-500'
    },
    {
      id: 'urban',
      name: 'Urban Explorer',
      description: 'Modern city landmarks and architecture',
      icon: Building,
      destinations: ['Skyscraper District', 'Modern Art Museum', 'Urban Park'],
      travelMode: 'transit',
      estimatedTime: '4-6 hours',
      color: 'text-gray-500'
    },
    {
      id: 'airport',
      name: 'Airport Connections',
      description: 'Multi-stop trip with airport pickup/drop',
      icon: Plane,
      destinations: ['Airport', 'Hotel', 'Meeting Location'],
      travelMode: 'driving',
      estimatedTime: '2-4 hours',
      color: 'text-indigo-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Quick Trip Templates
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get started faster with pre-made trip templates
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                onClick={() => onSelectTemplate(template)}
                className="w-full h-auto p-4 hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg bg-muted ${template.color}`}>
                    <template.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{template.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {template.destinations.length} stops
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {template.estimatedTime}
                      </span>
                      <span className="capitalize">
                        {template.travelMode === 'driving' && '🚗'}
                        {template.travelMode === 'walking' && '🚶'}
                        {template.travelMode === 'transit' && '🚌'}
                        {template.travelMode}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
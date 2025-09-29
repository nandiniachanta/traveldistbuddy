import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Zap, Users, Globe, Shield, Heart } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Zap,
      title: 'Smart Route Optimization',
      description: 'Our advanced algorithms find the most efficient routes, saving you time and fuel costs.',
      color: 'text-yellow-500'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Plan trips anywhere in the world with comprehensive mapping and local insights.',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      title: 'Multi-Traveler Support',
      description: 'Perfect for solo travelers, families, or group adventures with customizable preferences.',
      color: 'text-green-500'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your travel data stays private. We never share your locations or personal information.',
      color: 'text-purple-500'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Routes Optimized' },
    { value: '15M+', label: 'Miles Saved' },
    { value: '98%', label: 'User Satisfaction' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            About TravelDistBuddy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              TravelDistBuddy is your intelligent travel companion, designed to make multi-destination trips 
              effortless and efficient. Whether you're planning a business trip across multiple cities, 
              a family vacation with several stops, or exploring new places with friends, we help you 
              optimize your route for the best experience.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Our platform combines advanced routing algorithms with real-time data to provide you with 
              the most efficient paths, current weather conditions, and helpful travel insights. Save time, 
              reduce costs, and focus on what matters most - enjoying your journey.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                <feature.icon className={`w-6 h-6 ${feature.color} shrink-0 mt-0.5`} />
                <div>
                  <h4 className="font-medium mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Technology Stack */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Powered By
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">OpenStreetMap</Badge>
              <Badge variant="secondary">OpenWeather API</Badge>
              <Badge variant="secondary">React + TypeScript</Badge>
              <Badge variant="secondary">Advanced Algorithms</Badge>
              <Badge variant="secondary">Real-time Data</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Clock, MapPin, Eye, Trash2 } from 'lucide-react';

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

interface PastSearchesProps {
  pastSearches: PastSearch[];
  onViewSearch: (search: PastSearch) => void;
  onDeleteSearch: (searchId: string) => void;
}

export function PastSearches({ pastSearches, onViewSearch, onDeleteSearch }: PastSearchesProps) {
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 10080)}w ago`;
  };

  const getTravelModeEmoji = (mode: string) => {
    switch (mode) {
      case 'driving': return '🚗';
      case 'walking': return '🚶';
      case 'transit': return '🚌';
      default: return '🚗';
    }
  };

  if (pastSearches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Past Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No past searches yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your optimized routes will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Past Searches
          </div>
          <span className="text-sm text-muted-foreground">
            {pastSearches.length} route{pastSearches.length !== 1 ? 's' : ''}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {pastSearches.map((search) => (
            <div key={search.id} className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getTravelModeEmoji(search.travelMode)}</span>
                    <p className="truncate text-sm">{search.route}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(new Date(search.date))}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0 ml-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewSearch(search)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDeleteSearch(search.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {search.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {search.distance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
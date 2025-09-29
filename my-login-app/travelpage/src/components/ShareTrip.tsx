import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle, 
  QrCode,
  Download,
  Check
} from 'lucide-react';

interface ShareTripProps {
  tripData: {
    startLocation: string;
    destinations: string[];
    travelMode: string;
    duration?: string;
    distance?: string;
  };
}

export function ShareTrip({ tripData }: ShareTripProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      start: tripData.startLocation,
      destinations: tripData.destinations.join(','),
      mode: tripData.travelMode
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const shareableLink = generateShareableLink();
  const routeText = `${tripData.startLocation} → ${tripData.destinations.join(' → ')}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out my optimized travel route!');
    const body = encodeURIComponent(
      `I've planned an awesome trip route using TravelDistBuddy:\n\n` +
      `Route: ${routeText}\n` +
      `Travel Mode: ${tripData.travelMode}\n` +
      `${tripData.duration ? `Duration: ${tripData.duration}\n` : ''}` +
      `${tripData.distance ? `Distance: ${tripData.distance}\n` : ''}` +
      `\nView and optimize this route: ${shareableLink}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleSMSShare = () => {
    const text = encodeURIComponent(
      `Check out my travel route: ${routeText} - ${shareableLink}`
    );
    window.open(`sms:?body=${text}`);
  };

  const handleDownloadItinerary = () => {
    const itinerary = `
TravelDistBuddy - Trip Itinerary
================================

Route: ${routeText}
Travel Mode: ${tripData.travelMode}
${tripData.duration ? `Duration: ${tripData.duration}` : ''}
${tripData.distance ? `Distance: ${tripData.distance}` : ''}

Stops:
1. ${tripData.startLocation} (Starting Point)
${tripData.destinations.map((dest, index) => `${index + 2}. ${dest}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
Link: ${shareableLink}
    `.trim();

    const blob = new Blob([itinerary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trip-itinerary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Itinerary downloaded!');
  };

  if (!tripData.startLocation || tripData.destinations.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Trip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Trip
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Trip Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">
                {tripData.travelMode === 'driving' && '🚗'}
                {tripData.travelMode === 'walking' && '🚶'}
                {tripData.travelMode === 'transit' && '🚌'}
                {tripData.travelMode}
              </Badge>
              {tripData.duration && (
                <Badge variant="secondary">{tripData.duration}</Badge>
              )}
            </div>
            <p className="text-sm truncate">{routeText}</p>
          </div>

          {/* Shareable Link */}
          <div className="space-y-2">
            <Label>Shareable Link</Label>
            <div className="flex gap-2">
              <Input
                value={shareableLink}
                readOnly
                className="text-sm"
              />
              <Button
                size="sm"
                onClick={handleCopyLink}
                className={`shrink-0 transition-colors ${
                  copied ? 'bg-green-500 hover:bg-green-600' : ''
                }`}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <Label>Share Options</Label>
            <div className="grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={handleEmailShare}
                  className="w-full gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={handleSMSShare}
                  className="w-full gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  SMS
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={handleDownloadItinerary}
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={() => toast.info('QR code feature coming soon!')}
                  className="w-full gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  QR Code
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
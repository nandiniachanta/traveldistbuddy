import React from 'react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>

          {/* Attribution */}
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>Powered by OpenStreetMap + OpenWeather</p>
            <p className="mt-1">© 2024 TravelDistBuddy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
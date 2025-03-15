
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 px-6 md:px-10 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-10 md:mb-0">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 bg-tata-blue rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-semibold text-lg">Tata Play</span>
            </div>
            <p className="text-muted-foreground max-w-xs mb-6">
              Bringing the best entertainment experience to your home with innovative technology and premium content.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 rounded-md bg-tata-gray flex items-center justify-center hover:bg-tata-blue hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {/* Simplified social icons */}
                  <div className="w-5 h-5"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-medium text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Packages</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Channels</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-tata-blue transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tata Play. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0">
              <select className="bg-transparent text-sm text-muted-foreground border rounded-md py-1 px-2">
                <option value="en">English (US)</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

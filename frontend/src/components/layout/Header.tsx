
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-tata-blue rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="font-semibold text-lg">Tata Play</span>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-sm font-medium hover:text-tata-blue transition-colors">Home</a>
          <a href="#" className="text-sm font-medium hover:text-tata-blue transition-colors">Packages</a>
          <a href="#" className="text-sm font-medium hover:text-tata-blue transition-colors">Channels</a>
          <a href="#" className="text-sm font-medium hover:text-tata-blue transition-colors">Support</a>
        </nav>
        
        <div className="hidden md:block">
          <button className="btn-primary">
            Get Started
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-6 flex flex-col space-y-6">
          <a href="#" className="text-base font-medium hover:text-tata-blue transition-colors">Home</a>
          <a href="#" className="text-base font-medium hover:text-tata-blue transition-colors">Packages</a>
          <a href="#" className="text-base font-medium hover:text-tata-blue transition-colors">Channels</a>
          <a href="#" className="text-base font-medium hover:text-tata-blue transition-colors">Support</a>
          <button className="btn-primary w-full">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

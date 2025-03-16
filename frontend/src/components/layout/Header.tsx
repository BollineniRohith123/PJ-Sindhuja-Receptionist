import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall, Calendar, Shield, HeartPulse } from "lucide-react";
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
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-primary/10" 
          : "bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
            <div className="relative">
              <HeartPulse className="h-6 w-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white animate-pulse-subtle"></div>
            </div>
          </div>
          <div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hospital Buddy</span>
            <p className="text-xs text-muted-foreground">Medical Assistance</p>
          </div>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Shield className="h-4 w-4" /> Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Appointments
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <HeartPulse className="h-4 w-4" /> Departments
          </a>
          <a href="#" className="text-sm font-medium text-secondary font-bold flex items-center gap-1">
            <PhoneCall className="h-4 w-4" /> Emergency
          </a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="btn-primary bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Doctor Portal
          </button>
          <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-all duration-200 transform hover:scale-105 font-semibold">
            <span className="animate-pulse mr-2">●</span> Emergency Care
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
        <div className="px-6 py-6 flex flex-col space-y-6 border-t border-primary/10">
          <a href="#" className="text-base font-medium hover:text-primary transition-colors flex items-center gap-2">
            <Shield className="h-5 w-5" /> Home
          </a>
          <a href="#" className="text-base font-medium hover:text-primary transition-colors flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Appointments
          </a>
          <a href="#" className="text-base font-medium hover:text-primary transition-colors flex items-center gap-2">
            <HeartPulse className="h-5 w-5" /> Departments
          </a>
          <a href="#" className="text-base font-medium text-secondary font-bold flex items-center gap-2">
            <PhoneCall className="h-5 w-5" /> Emergency
          </a>
          <div className="flex flex-col space-y-4">
            <button className="btn-primary w-full bg-gradient-to-r from-primary to-accent text-white transition-all duration-200">
              Doctor Portal
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-all duration-200 font-semibold">
              <span className="animate-pulse mr-2">●</span> Emergency Care
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

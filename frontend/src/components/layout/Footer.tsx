import React from "react";
import { HeartPulse, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-10 border-t relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hospital Buddy</span>
                <p className="text-xs text-muted-foreground">Advanced Healthcare Platform</p>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-xs mb-8">
              Empowering medical professionals with AI-powered tools for enhanced patient care, streamlined workflows, and improved clinical outcomes.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-primary mr-3" />
                <span>contact@hospitalbuddy.com</span>
              </div>
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 text-primary mr-3 mt-0.5" />
                <span>123 Healthcare Avenue, Medical District<br/>New Delhi, 110001</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">For Doctors</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Doctor Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Clinical Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Telemedicine Tools
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Continuing Education
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Referral Network
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Patient Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Appointment Booking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Patient Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Insurance Processing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Find a Specialist
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary font-medium hover:text-secondary/80 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-100" />
                  Emergency Care
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect With Us</h3>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            
            <h4 className="font-medium text-base mb-4">Subscribe to our newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-sm border border-gray-300 focus:border-primary focus:outline-none rounded-l-lg"
              />
              <button className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-r-lg hover:shadow-md transition-shadow">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 md:mb-0">
              <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">HIPAA Compliance</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Cookie Policy</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Hospital Buddy. All rights reserved.
              </p>
              
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

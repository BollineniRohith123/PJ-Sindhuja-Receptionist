import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check, ArrowRight, PlayCircle, Tv } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import CustomSelect, { SelectOption } from "@/components/CustomSelect";

const packageOptions: SelectOption[] = [
  { value: "Enquiry", label: "Enquiry", description: "Enquiry" },
  { value: "Issue", label: "Issue", description: "Issue" },
  { value: "Selling", label: "Selling", description: "Selling" },
];

const HeroSection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [packageError, setPackageError] = useState("");
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");
  
  // Validate phone number (must be 10 digits)
  useEffect(() => {
    if (phoneNumber && phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  }, [phoneNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    let isValid = true;
    
    if (!phoneNumber || phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number");
      isValid = false;
    }
    
    if (!selectedPackage) {
      setPackageError("Please select a package");
      isValid = false;
    }
    
    if (!token) {
      setTokenError("Please enter a token");
      isValid = false;
    }
    
    if (isValid) {
      try {
        // Prepare payload
        const payload = {
          phoneNumber: `+91${phoneNumber}`,
          selectedPackage: packageOptions.find(p => p.value === selectedPackage)?.label || selectedPackage,
          token: token
        };

        // Make API call
        const response = await fetch('http://localhost:3000/api/ai-calls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('API call failed');
        }

        const result = await response.json();

        // Show form details in console
        console.group("Form Submission Details");
        console.log("Payload:", payload);
        console.log("API Response:", result);
        console.groupEnd();

        // Submit form success
        toast.success("Form submitted successfully", {
          description: `We'll contact you at ${formatPhoneDisplay(phoneNumber)} about the ${payload.selectedPackage}.`,
          position: "top-center",
        });
        
        // Reset form
        setPhoneNumber("");
        setSelectedPackage("");
        setToken("");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit form", {
          description: "Please try again later.",
          position: "top-center",
        });
      }
    }
  };

  // Format phone for display (10 digit Indian mobile number)
  const formatPhoneDisplay = (phone: string) => {
    if (!phone || phone.length !== 10) return phone;
    return `+91${phone}`; // Format as XXXXX XXXXX
  };

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 md:pr-10 staggered">
            <span className="inline-block px-4 py-1 bg-tata-blue/10 text-tata-blue rounded-md text-sm font-medium mb-6">
              Premium Entertainment
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
              Elevate Your <span className="text-tata-blue">Viewing Experience</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 md:mb-10 max-w-xl">
              Access over 600+ channels with crystal-clear quality and innovative features designed for the modern viewer.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <button className="btn-primary">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-primary bg-transparent border border-tata-blue text-tata-blue hover:bg-tata-blue/5">
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
              </button>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1 mr-2">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm">HD Quality</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1 mr-2">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm">600+ Channels</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1 mr-2">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="glass rounded-md p-8 md:p-10 shadow-glass-lg border border-white/40 animate-fade-in-up">
              <div className="flex items-center justify-center w-14 h-14 rounded-md bg-tata-blue/10 text-tata-blue mb-6">
                <Tv className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold mb-6">Get Connected Today</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will contact you to set up your new Tata Play connection.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <PhoneInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onValueChange={setPhoneNumber}
                  error={phoneError}
                  helperText="We'll contact you on this number"
                  required
                />
                
                <CustomSelect
                  label="Select Package"
                  options={packageOptions}
                  value={selectedPackage}
                  onChange={setSelectedPackage}
                  placeholder="Choose a package"
                  error={packageError}
                  helperText="Select the package that suits your needs"
                />
                
                <div className="space-y-2">
                  <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                    Token
                  </label>
                  <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tata-blue focus:border-tata-blue sm:text-sm"
                    placeholder="Enter your token"
                    required
                  />
                  {tokenError && (
                    <p className="mt-2 text-sm text-red-600">{tokenError}</p>
                  )}
                </div>
                
                <button type="submit" className="btn-primary w-full mt-4">
                  Submit Request
                </button>
              </form>
              
              <p className="text-xs text-center text-muted-foreground mt-6">
                By submitting, you agree to our 
                <a href="#" className="text-tata-blue hover:underline ml-1">Terms of Service</a> and 
                <a href="#" className="text-tata-blue hover:underline ml-1">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

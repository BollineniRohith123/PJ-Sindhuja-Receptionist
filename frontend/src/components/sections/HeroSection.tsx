import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check, ArrowRight, PlayCircle, Stethoscope, Shield, ClipboardCheck, Activity, Calendar } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import CustomSelect, { SelectOption } from "@/components/CustomSelect";

const hospitalServices: SelectOption[] = [
  {
    value: "reception",
    label: "Hospital Reception",
    description: "General inquiries, appointments, and patient registration"
  },
  {
    value: "insurance",
    label: "Insurance Processing",
    description: "Insurance verification and claims processing"
  },
  {
    value: "emergency",
    label: "Emergency Response",
    description: "Urgent care and emergency services"
  },
  {
    value: "specialist",
    label: "Specialist Consultation",
    description: "Connect with medical specialists for expert opinions"
  },
  {
    value: "followup",
    label: "Patient Follow-up",
    description: "Schedule follow-up appointments for continued care"
  }
];

const HeroSection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [packageError, setPackageError] = useState("");
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      setIsSubmitting(true);
      try {
        // Get the selected service option
        const selectedService = hospitalServices.find(p => p.value === selectedPackage);
        
        // Prepare payload
        const payload = {
          phoneNumber: `+91${phoneNumber}`,
          selectedPackage: selectedPackage, // Send the value (backend expects this)
          token: token
        };

        // Make API call - use a relative path for better deployment flexibility
        const response = await fetch('/api/ai-calls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'API call failed');
        }

        const result = await response.json();

        // Submit form success
        toast.success("Form submitted successfully", {
          description: `We'll connect with the patient at ${formatPhoneDisplay(phoneNumber)} for ${selectedService?.label || selectedPackage}.`,
          position: "top-center",
        });
        
        // Reset form
        setPhoneNumber("");
        setSelectedPackage("");
        setToken("");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit form", {
          description: error instanceof Error ? error.message : "Please try again later.",
          position: "top-center",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Format phone for display (10 digit Indian mobile number)
  const formatPhoneDisplay = (phone: string) => {
    if (!phone || phone.length !== 10) return phone;
    return `+91${phone}`; 
  };

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-10 bg-gradient-to-b from-primary-light via-white to-accent-light overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent-light rounded-full filter blur-3xl opacity-30 animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-light rounded-full filter blur-3xl opacity-30 animate-pulse-subtle"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="md:w-1/2 md:pr-10 staggered space-y-8">
            <span className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm font-medium mb-6">
              <Stethoscope className="h-4 w-4 mr-2" /> Advanced Healthcare Platform
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
              Empowering <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Doctors</span> with AI Technology
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 md:mb-10 max-w-xl">
              Our intelligent healthcare platform streamlines patient care, enhances diagnostic accuracy, and improves medical outcomes through advanced AI assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <button className="btn-primary bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105 py-3">
                Doctor Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-primary bg-white border border-primary/20 text-primary hover:bg-primary-light transition-all duration-200 transform hover:scale-105 py-3">
                <Calendar className="mr-2 h-5 w-5" /> Schedule Consultation
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-primary/10 hover:border-primary/20 transition-all">
                <div className="rounded-full p-2 bg-success/10 mr-3">
                  <Activity className="h-5 w-5 text-success" />
                </div>
                <span className="text-sm">Advanced Diagnostics</span>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-primary/10 hover:border-primary/20 transition-all">
                <div className="rounded-full p-2 bg-primary/10 mr-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Secure Patient Data</span>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-primary/10 hover:border-primary/20 transition-all">
                <div className="rounded-full p-2 bg-accent/10 mr-3">
                  <ClipboardCheck className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm">Smart Scheduling</span>
              </div>
            </div>

            <div className="pt-6 flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Check className="h-4 w-4 text-success mr-1" />
                HIPAA Compliant
              </span>
              <span>|</span>
              <span className="flex items-center">
                <Check className="h-4 w-4 text-success mr-1" />
                ISO 27001 Certified
              </span>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="glass rounded-2xl p-8 md:p-10 shadow-xl backdrop-blur-md bg-white/90 border border-white/50 animate-fade-in-up">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white mb-6 transform hover:rotate-12 transition-transform duration-300">
                <Stethoscope className="h-8 w-8" />
              </div>
              
              <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Doctor Connection Portal</h2>
              <p className="text-muted-foreground mb-6">
                Connect with patients instantly through our AI-assisted communication channel for efficient consultations.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <PhoneInput
                  label="Patient Phone Number"
                  placeholder="Enter patient's phone number"
                  value={phoneNumber}
                  onValueChange={setPhoneNumber}
                  error={phoneError}
                  helperText="Used for secure patient communication"
                  required
                />
                
                <CustomSelect
                  label="Medical Service"
                  options={hospitalServices}
                  value={selectedPackage}
                  onChange={setSelectedPackage}
                  placeholder="Select medical service"
                  error={packageError}
                  helperText="Choose the appropriate medical service"
                />
                
                <div className="space-y-2">
                  <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                    Authentication Token
                  </label>
                  <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Enter your authentication token"
                    required
                  />
                  {tokenError && (
                    <p className="mt-2 text-sm text-red-600">{tokenError}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="mr-2 h-5 w-5" />
                      Connect with Patient
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary-light to-accent-light">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Your connection is secure and compliant with healthcare privacy standards.
                      By submitting, you agree to our 
                      <a href="#" className="text-primary hover:underline mx-1">Terms of Service</a> and 
                      <a href="#" className="text-primary hover:underline mx-1">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

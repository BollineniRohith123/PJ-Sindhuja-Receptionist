import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, UserCheck, Microscope, Database, ClipboardCheck, Building, Activity, HeartPulse, BrainCircuit, Calendar, ClipboardList, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: Feature[] = [
  {
    title: "24/7 Emergency Response",
    description: "AI-assisted emergency triage system with real-time patient monitoring and rapid response protocols.",
    icon: <Clock className="h-6 w-6" />,
    color: "from-red-500 to-orange-400",
  },
  {
    title: "Specialist Network Access",
    description: "Instantly connect with medical specialists across departments for collaborative patient care.",
    icon: <UserCheck className="h-6 w-6" />,
    color: "from-primary to-blue-400",
  },
  {
    title: "Advanced Diagnostics",
    description: "AI-powered diagnostic tools for faster, more accurate analysis of medical data and imaging results.",
    icon: <Microscope className="h-6 w-6" />,
    color: "from-violet-500 to-purple-400",
  },
  {
    title: "Secure Medical Records",
    description: "Blockchain-secured electronic health records with instant access to complete patient medical history.",
    icon: <Database className="h-6 w-6" />,
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Smart Patient Management",
    description: "Automated scheduling, follow-ups, and treatment plans tailored to individual patient needs.",
    icon: <ClipboardCheck className="h-6 w-6" />,
    color: "from-accent to-cyan-400",
  },
  {
    title: "Predictive Analytics",
    description: "Advanced analytics that help predict patient outcomes and recommend optimal treatment approaches.",
    icon: <BrainCircuit className="h-6 w-6" />,
    color: "from-indigo-500 to-blue-400",
  },
];

const doctorBenefits: string[] = [
  "Reduced administrative burden",
  "Simplified patient communication",
  "Evidence-based decision support",
  "Real-time collaboration with specialists",
  "Streamlined documentation",
  "Automated follow-up scheduling"
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-accent-light via-white to-primary-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0 mb-4 px-4 py-1 text-sm font-medium rounded-full">
            Physician-Centered Technology
          </Badge>
          <h2 className="section-title text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Advanced Solutions for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Modern Healthcare</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with physician expertise to deliver exceptional patient care and streamline medical workflows.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group card-gradient h-full"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
                <div className="pt-2">
                  <a href="#" className="inline-flex items-center text-primary font-medium text-sm hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/10">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Badge variant="outline" className="bg-primary/10 text-primary border-0 mb-4 w-fit px-3 py-1 text-xs font-medium rounded-full">
                For Medical Professionals
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">How Our Platform Benefits Doctors</h3>
              <div className="space-y-4">
                {doctorBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="rounded-full p-1 bg-success/10 mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 inline-flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg w-fit">
                Explore Doctor Features <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-primary to-accent p-8 md:p-12 text-white flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <HeartPulse className="h-8 w-8 mr-3" />
                <h3 className="text-2xl md:text-3xl font-bold">Clinical Excellence</h3>
              </div>
              <p className="mb-8 text-white/90">
                Our platform is designed by doctors, for doctors, to enhance clinical workflows and improve patient outcomes through intelligent automation and decision support.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-colors duration-300">
                  <Activity className="h-8 w-8 mb-3" />
                  <span className="text-center font-medium">Diagnostic Support</span>
                </div>
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-colors duration-300">
                  <BrainCircuit className="h-8 w-8 mb-3" />
                  <span className="text-center font-medium">AI Assistance</span>
                </div>
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-colors duration-300">
                  <Calendar className="h-8 w-8 mb-3" />
                  <span className="text-center font-medium">Smart Scheduling</span>
                </div>
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-colors duration-300">
                  <ClipboardList className="h-8 w-8 mb-3" />
                  <span className="text-center font-medium">Documentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <button className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

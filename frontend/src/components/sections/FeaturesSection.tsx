
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Crystal Clear HD",
    description: "Experience stunning visual clarity with our high-definition channels and advanced transmission technology.",
    icon: "✨",
  },
  {
    title: "Smart Recording",
    description: "Never miss your favorite shows with our intelligent recording feature that works seamlessly with your schedule.",
    icon: "⏱️",
  },
  {
    title: "Multi-Device Streaming",
    description: "Watch your favorite content on any device with our synchronized streaming service.",
    icon: "📱",
  },
  {
    title: "Voice Control",
    description: "Control your TV with simple voice commands for a hands-free entertainment experience.",
    icon: "🎤",
  },
  {
    title: "Personalized Recommendations",
    description: "Discover new content based on your preferences with our smart recommendation engine.",
    icon: "🔍",
  },
  {
    title: "Parental Controls",
    description: "Create a safe viewing environment for your family with customizable content restrictions.",
    icon: "🔒",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-tata-blue/10 text-tata-blue border-0 mb-4 px-4 py-1 text-sm font-medium rounded-none">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-tata-dark-gray">
            Experience Entertainment Like Never Before
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a world of entertainment with features designed to enhance your viewing experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="rounded-none border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-tata-blue/20 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-tata-blue/10 rounded-none flex items-center justify-center mb-6 text-tata-blue text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-tata-dark-gray">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="pt-2">
                  <a href="#" className="inline-flex items-center text-tata-blue font-medium text-sm hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center bg-tata-blue hover:bg-tata-dark-blue text-white font-medium py-3 px-8 rounded-none transition-colors duration-300">
            View All Features <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

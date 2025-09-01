"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic Consultation",
      price: "$25",
      duration: "15 minutes",
      features: [
        "Video consultation with certified doctor",
        "Basic health assessment",
        "Prescription if needed",
        "Follow-up recommendations"
      ],
      popular: false
    },
    {
      name: "Standard Consultation",
      price: "$45",
      duration: "30 minutes",
      features: [
        "Extended video consultation",
        "Comprehensive health assessment",
        "Detailed medical advice",
        "Prescription if needed",
        "Medical report summary",
        "Follow-up recommendations"
      ],
      popular: true
    },
    {
      name: "Premium Consultation",
      price: "$75",
      duration: "45 minutes",
      features: [
        "Extended consultation with specialist",
        "In-depth health analysis",
        "Personalized treatment plan",
        "Prescription if needed",
        "Detailed medical report",
        "Priority follow-up support",
        "Health monitoring recommendations"
      ],
      popular: false
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {pricingPlans.map((plan, index) => (
        <Card 
          key={index}
          className={`relative border-emerald-900/30 shadow-lg bg-gradient-to-b from-emerald-950/30 to-transparent ${
            plan.popular ? 'ring-2 ring-emerald-500/50' : ''
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white">
              Most Popular
            </Badge>
          )}
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-emerald-400 mb-1">{plan.price}</div>
              <p className="text-sm text-muted-foreground">{plan.duration} consultation</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-emerald-900/50 hover:bg-emerald-800/50 border border-emerald-700/50'
              }`}
              onClick={() => {
                // Add your booking logic here
                window.location.href = '/doctors';
              }}
            >
              Book Consultation
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Pricing;

import React from "react";
import { Award, Users, Star, Clock } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { icon: Award, number: "19+", label: "Years Experience" },
    { icon: Users, number: "499+", label: "Clients Served" },
    { icon: Star, number: "100%", label: "Satisfaction" },
    { icon: Clock, number: "24/7", label: "Support" },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FAFAF6] dark:bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <IconComponent
                    className="w-10 h-10 md:w-12 md:h-12 text-[#FF6E40]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="font-bold text-[#111] dark:text-white/90 mb-2"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "clamp(28px, 4vw, 42px)",
                  }}
                >
                  {stat.number}
                </h3>
                <p
                  className="text-[#606060] dark:text-white/60"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

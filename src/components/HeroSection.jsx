import React from "react";
import { Phone, Bot } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Professional financial services"
          className="w-full h-full object-cover object-center"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0F172A 0%, rgba(15, 23, 42, 0.95) 20%, rgba(15, 23, 42, 0.7) 40%, transparent 60%)",
          }}
        />

        <div className="absolute inset-0 dark:bg-black/10" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center py-20 lg:py-0 max-w-[600px]">
              {/* Eyebrow */}
              <div
                className="mb-4 font-medium tracking-wide uppercase text-[#FF6E40]"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "14px",
                }}
              >
                Chartered Accountants Since 2006
              </div>

              {/* Main headline */}
              <div className="mb-6">
                <h1
                  className="font-bold text-white leading-tight"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "clamp(36px, 5.5vw, 64px)",
                    lineHeight: "clamp(42px, 6.2vw, 72px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Your Trusted Partner in Financial Excellence
                </h1>
              </div>

              {/* Sub-headline */}
              <div className="mb-8 max-w-[480px]">
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  Delivering premium audit, tax, accounting, and business
                  advisory services with integrity and innovation for over 18
                  years.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/ai-assistant"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-[#FF6E40] text-white rounded-full transition-all duration-200 hover:bg-[#D4541A] active:scale-95 shadow-lg font-semibold"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "16px",
                  }}
                >
                  <Bot size={20} />
                  <span>AI Tax Assistant</span>
                </a>

                <a
                  href="#contact"
                  className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-white/80 bg-transparent text-white rounded-full transition-all duration-200 hover:bg-white hover:text-[#0F172A] active:scale-95 font-semibold"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "16px",
                  }}
                >
                  <Phone size={20} />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

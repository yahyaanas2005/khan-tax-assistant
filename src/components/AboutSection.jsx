import React from "react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-14 md:py-16 lg:py-20 bg-white dark:bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column - Image */}
          <div className="order-1 md:order-1">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Professional chartered accountants team"
                className="w-full h-auto object-cover rounded-lg dark:opacity-90"
                style={{ aspectRatio: "3/4" }}
              />
              <div className="absolute inset-0 dark:bg-black/20 rounded-lg pointer-events-none" />
            </div>
          </div>

          {/* Right column - Content */}
          <div className="order-2 md:order-2">
            <h2
              className="mb-6 font-bold leading-tight text-[#000] dark:text-white/90"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "clamp(32px, 4.5vw, 48px)",
                lineHeight: "1.1",
              }}
            >
              About Khan Waheed & Co.
            </h2>

            <p
              className="mb-6 text-[#444] dark:text-white/70"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: "1.7",
              }}
            >
              Khan Waheed & Co. is a premier firm of Chartered Accountants with
              over 18 years of distinguished service in Pakistan. We specialize
              in providing comprehensive financial solutions including audit,
              taxation, accounting, and strategic business advisory.
            </p>

            <p
              className="mb-8 text-[#444] dark:text-white/70"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: "1.7",
              }}
            >
              Our team of highly qualified professionals combines deep industry
              expertise with cutting-edge technology to deliver exceptional
              results for businesses of all sizes.
            </p>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "19+ Years Excellence",
                "Client-Focused Approach",
                "Modern Tech Solutions",
                "Global Standards",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-[#FAFAF6] dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <p
                    className="text-[#111] dark:text-white/90 font-medium"
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "14px",
                    }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

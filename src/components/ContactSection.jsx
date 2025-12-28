import React from "react";
import { Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-20 lg:py-24 bg-white dark:bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="mb-2 font-medium tracking-[0.12em] uppercase text-[rgba(85,85,85,0.7)] dark:text-white/50"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "12px",
            }}
          >
            GET IN TOUCH
          </div>
          <h2
            className="mb-4 font-bold leading-tight max-w-[720px] mx-auto text-[#111] dark:text-white/90"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.2",
            }}
          >
            We're Here to Help
          </h2>
          <p
            className="max-w-[600px] mx-auto text-[#606060] dark:text-white/60"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.6",
            }}
          >
            Contact us for all your financial needs
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#FAFAF6] dark:bg-[#1E1E1E] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-[#FF6E40]/10 rounded-xl">
              <Phone className="w-7 h-7 text-[#FF6E40]" strokeWidth={1.5} />
            </div>
            <h3
              className="mb-2 font-bold text-[#111] dark:text-white/90"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "18px",
              }}
            >
              Phone
            </h3>
            <p
              className="text-[#606060] dark:text-white/60"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
              }}
            >
              +92 3218569504
            </p>
          </div>

          <div className="bg-[#FAFAF6] dark:bg-[#1E1E1E] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-[#FF6E40]/10 rounded-xl">
              <Mail className="w-7 h-7 text-[#FF6E40]" strokeWidth={1.5} />
            </div>
            <h3
              className="mb-2 font-bold text-[#111] dark:text-white/90"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "18px",
              }}
            >
              Email
            </h3>
            <p
              className="text-[#606060] dark:text-white/60"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
              }}
            >
              info@khanwco.com
            </p>
          </div>

          <div className="bg-[#FAFAF6] dark:bg-[#1E1E1E] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-[#FF6E40]/10 rounded-xl">
              <Clock className="w-7 h-7 text-[#FF6E40]" strokeWidth={1.5} />
            </div>
            <h3
              className="mb-2 font-bold text-[#111] dark:text-white/90"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "18px",
              }}
            >
              Business Hours
            </h3>
            <p
              className="text-[#606060] dark:text-white/60"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
              }}
            >
              Mon-Fri: 9AM-6PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

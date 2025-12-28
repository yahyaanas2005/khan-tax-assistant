import React from "react";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Khan Waheed & Co. transformed our financial management. Their expertise in tax planning saved us significantly.",
      name: "Ahmed Hassan",
      role: "CEO, Tech Solutions Ltd",
    },
    {
      quote:
        "Professional, reliable, and always available. Best chartered accountants we've worked with in 10 years.",
      name: "Sarah Khan",
      role: "Founder, Retail Chain",
    },
    {
      quote:
        "Their audit services are thorough and their business advisory has been invaluable for our growth.",
      name: "Muhammad Ali",
      role: "Director, Manufacturing Co",
    },
  ];

  return (
    <section
      id="testimonials"
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
            TESTIMONIALS
          </div>
          <h2
            className="mb-4 font-bold leading-tight max-w-[720px] mx-auto text-[#111] dark:text-white/90"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.2",
            }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#FAFAF6] dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <Quote
                className="w-10 h-10 text-[#FF6E40] mb-4"
                strokeWidth={1.5}
              />

              <p
                className="mb-6 text-[#444] dark:text-white/70"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "15px",
                  lineHeight: "1.7",
                }}
              >
                "{testimonial.quote}"
              </p>

              <div>
                <p
                  className="font-bold text-[#111] dark:text-white/90 mb-1"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "16px",
                  }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-[#606060] dark:text-white/60"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                  }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

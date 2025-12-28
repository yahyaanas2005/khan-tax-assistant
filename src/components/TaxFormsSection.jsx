import React from "react";
import { FileText, Building2, Users, DollarSign, Bot } from "lucide-react";

export default function TaxFormsSection() {
  const forms = [
    { icon: FileText, code: "1040", label: "Individual" },
    { icon: Building2, code: "1120", label: "Corporate" },
    { icon: Users, code: "1065", label: "Partnership" },
    { icon: DollarSign, code: "1099", label: "Contractor" },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#FAFAF6] dark:bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <div
              className="mb-2 font-medium tracking-[0.12em] uppercase text-[#FF6E40]"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "12px",
              }}
            >
              AI-POWERED SOLUTION
            </div>
            <h2
              className="mb-6 font-bold leading-tight text-[#111] dark:text-white/90"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "clamp(32px, 4.5vw, 48px)",
                lineHeight: "1.1",
              }}
            >
              USA Tax Form Assistance
            </h2>
            <p
              className="mb-8 text-[#606060] dark:text-white/60 max-w-[480px]"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: "1.7",
              }}
            >
              Navigate US tax filing with our AI-powered assistant. Get
              personalized recommendations for the right IRS forms based on your
              specific situation.
            </p>
            <a
              href="/ai-assistant"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#FF6E40] text-white rounded-full transition-all duration-200 hover:bg-[#D4541A] active:scale-95 shadow-lg font-semibold"
              style={{ fontFamily: '"Inter", sans-serif', fontSize: "16px" }}
            >
              <Bot size={20} />
              <span>Try AI Tax Assistant</span>
            </a>
          </div>

          {/* Right column - Form cards */}
          <div className="grid grid-cols-2 gap-4">
            {forms.map((form, index) => {
              const IconComponent = form.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-[#FF6E40]/10 rounded-xl">
                    <IconComponent
                      className="w-6 h-6 text-[#FF6E40]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p
                    className="font-bold text-[#111] dark:text-white/90 mb-1"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "24px",
                    }}
                  >
                    {form.code}
                  </p>
                  <p
                    className="text-[#606060] dark:text-white/60"
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "14px",
                    }}
                  >
                    {form.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import {
  ShieldCheck,
  Calculator,
  FileText,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: ShieldCheck,
      title: "Statutory Audit",
      description:
        "Comprehensive audit services ensuring compliance with regulatory standards and financial accuracy.",
      features: [
        "Financial Statement Audit",
        "Internal Controls",
        "Compliance Verification",
      ],
    },
    {
      icon: Calculator,
      title: "Tax Compliance",
      description:
        "Expert tax preparation, planning, and filing services for individuals and businesses.",
      features: ["Tax Planning", "Return Preparation", "IRS Representation"],
    },
    {
      icon: FileText,
      title: "Accounting Services",
      description:
        "Professional accounting and bookkeeping to keep your financial records accurate.",
      features: [
        "Monthly Bookkeeping",
        "Financial Reporting",
        "Payroll Management",
      ],
    },
    {
      icon: TrendingUp,
      title: "Business Advisory",
      description:
        "Strategic consulting to help you make informed financial decisions and drive growth.",
      features: [
        "Strategic Planning",
        "Performance Analysis",
        "Growth Consulting",
      ],
    },
    {
      icon: DollarSign,
      title: "Financial Planning",
      description:
        "Comprehensive financial planning and analysis for sustainable business success.",
      features: [
        "Budget Planning",
        "Cash Flow Analysis",
        "Investment Advisory",
      ],
    },
    {
      icon: AlertCircle,
      title: "Risk Management",
      description:
        "Identify and mitigate financial risks with our expert advisory services.",
      features: ["Risk Assessment", "Compliance Management", "Internal Audit"],
    },
  ];

  return (
    <section
      id="services"
      className="py-16 md:py-20 lg:py-24 bg-[#FAFAF6] dark:bg-[#0F0F0F]"
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
            OUR SERVICES
          </div>
          <h2
            className="mb-4 font-bold leading-tight max-w-[720px] mx-auto text-[#111] dark:text-white/90"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.2",
            }}
          >
            Comprehensive Financial Solutions
          </h2>
          <p
            className="max-w-[600px] mx-auto text-[#606060] dark:text-white/60"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.6",
            }}
          >
            Professional services tailored to your unique business needs
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-14 h-14 mb-5 bg-[#FF6E40]/10 rounded-xl">
                  <IconComponent
                    className="w-7 h-7 text-[#FF6E40]"
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className="mb-3 font-bold text-[#111] dark:text-white/90"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: "20px",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  className="mb-4 text-[#606060] dark:text-white/60"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-[#444] dark:text-white/70"
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "13px",
                      }}
                    >
                      <span className="mr-2 text-[#FF6E40]">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

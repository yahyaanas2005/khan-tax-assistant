"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Bot,
  Phone,
  Mail,
  Clock,
  Award,
  Users,
  Star,
  ShieldCheck,
  Calculator,
  FileText,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Quote,
  Building2,
} from "lucide-react";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const stats = [
    { icon: Award, number: "19+", label: "Years Experience" },
    { icon: Users, number: "499+", label: "Clients Served" },
    { icon: Star, number: "100%", label: "Satisfaction" },
    { icon: Clock, number: "24/7", label: "Support" },
  ];

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

  const forms = [
    { icon: FileText, code: "1040", label: "Individual" },
    { icon: Building2, code: "1120", label: "Corporate" },
    { icon: Users, code: "1065", label: "Partnership" },
    { icon: DollarSign, code: "1099", label: "Contractor" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* HEADER */}
      <>
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 font-inter">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg border border-gray-200 dark:border-gray-700 px-8 py-3">
            <div className="flex items-center justify-between gap-8">
              <a
                href="/"
                className="text-[20px] sm:text-[24px] font-bold text-[#1B1B1B] dark:text-white/90 whitespace-nowrap"
              >
                Khan Waheed & Co.
              </a>

              <nav className="hidden lg:flex items-center space-x-6">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[14px] xl:text-[16px] font-medium transition-all duration-150 ease-in-out text-[#4B4B4B] dark:text-white/70 hover:text-[#FF6E40] dark:hover:text-[#FF8A65] active:scale-95 whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/ai-assistant"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-[#FF6E40] text-white rounded-full transition-all duration-150 hover:bg-[#D4541A] active:scale-95 whitespace-nowrap"
                >
                  <Bot size={18} />
                  <span className="text-[14px] font-semibold">
                    AI Tax Assistant
                  </span>
                </a>
              </nav>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#4B4B4B] dark:text-white/70 transition-all duration-150 hover:text-[#FF6E40] active:scale-95"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 lg:hidden w-80 max-w-[90vw]">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[16px] font-medium transition-all duration-150 py-2 px-3 rounded-lg text-[#4B4B4B] dark:text-white/70 hover:text-[#FF6E40] hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/ai-assistant"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#FF6E40] text-white rounded-full transition-all duration-150 hover:bg-[#D4541A] active:scale-95"
                >
                  <Bot size={18} />
                  <span className="font-semibold">AI Tax Assistant</span>
                </a>
              </nav>
            </div>
          </div>
        )}
      </>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
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

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 min-h-screen">
              <div className="flex flex-col justify-center py-20 lg:py-0 max-w-[600px]">
                <div
                  className="mb-4 font-medium tracking-wide uppercase text-[#FF6E40]"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                  }}
                >
                  Chartered Accountants Since 2006
                </div>

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

      {/* STATS SECTION */}
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

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-14 md:py-16 lg:py-20 bg-white dark:bg-[#121212]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
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
                Khan Waheed & Co. is a premier firm of Chartered Accountants
                with over 18 years of distinguished service in Pakistan. We
                specialize in providing comprehensive financial solutions
                including audit, taxation, accounting, and strategic business
                advisory.
              </p>

              <p
                className="mb-8 text-[#444] dark:text-white/70"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  lineHeight: "1.7",
                }}
              >
                Our team of highly qualified professionals combines deep
                industry expertise with cutting-edge technology to deliver
                exceptional results for businesses of all sizes.
              </p>

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

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="py-16 md:py-20 lg:py-24 bg-[#FAFAF6] dark:bg-[#0F0F0F]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
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

      {/* TESTIMONIALS SECTION */}
      <section
        id="testimonials"
        className="py-16 md:py-20 lg:py-24 bg-white dark:bg-[#121212]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
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

      {/* TAX FORMS SECTION */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#FAFAF6] dark:bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                personalized recommendations for the right IRS forms based on
                your specific situation.
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

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-16 md:py-20 lg:py-24 bg-white dark:bg-[#121212]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
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

      {/* FOOTER */}
      <footer className="py-8 bg-[#0F172A] dark:bg-[#000000] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p
            className="text-center text-gray-400"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "14px",
            }}
          >
            © 2025 Khan Waheed & Co. Chartered Accountants. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

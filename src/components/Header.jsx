import React, { useState } from "react";
import { Menu, X, Bot } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 font-inter">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg border border-gray-200 dark:border-gray-700 px-8 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <a
              href="/"
              className="text-[20px] sm:text-[24px] font-bold text-[#1B1B1B] dark:text-white/90 whitespace-nowrap"
            >
              Khan Waheed & Co.
            </a>

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-[#4B4B4B] dark:text-white/70 transition-all duration-150 hover:text-[#FF6E40] active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
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
  );
}

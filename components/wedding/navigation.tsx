"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navItems = [
  { label: "Inicio", href: "#" },
  { label: "Nuestra Historia", href: "#historia" },
  { label: "Evento", href: "#evento" },
  { label: "Itinerario", href: "#itinerario" },
  { label: "Galeria", href: "#galeria" },
  { label: "Regalos", href: "#regalos" },
  { label: "FAQ", href: "#faq" },
  { label: "RSVP", href: "#rsvp" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, duration: 0.3 }
      );
    }
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a1628]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Names */}
            <button
              onClick={() => scrollToSection("#")}
              className="font-serif text-xl text-white hover:text-[#c9a959] transition-colors"
            >
              M & C
            </button>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="font-sans text-sm text-white/70 hover:text-[#c9a959] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0a1628]/98 backdrop-blur-md z-40 lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="mobile-nav-item font-serif text-2xl text-white hover:text-[#c9a959] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

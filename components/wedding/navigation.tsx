"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { AnimatedHeart } from "./animated-icons";

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
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const motionAllowedRef = useRef(true);
  const canHoverRef = useRef(true);

  useEffect(() => {
    motionAllowedRef.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!motionAllowedRef.current) return;

    // Nav entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!motionAllowedRef.current) return;
    if (isOpen) {
      // Mobile menu open animation
      gsap.fromTo(
        ".mobile-nav-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        ".mobile-nav-item",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        ".mobile-nav-deco",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.5, ease: "back.out(2)" }
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

  // Animate menu button on hover
  const handleMenuBtnHover = (entering: boolean) => {
    if (!motionAllowedRef.current || !canHoverRef.current) return;
    gsap.to(menuBtnRef.current, {
      scale: entering ? 1.1 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <>
      {/* Desktop/Mobile navigation bar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#0a1628]/95 backdrop-blur-md shadow-xl py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Names */}
            <button
              onClick={() => scrollToSection("#")}
              className="group flex items-center gap-2"
            >
              <AnimatedHeart className="w-5 h-5 group-hover:scale-125 transition-transform" />
              <span className="font-serif text-xl text-white hover:text-[#c9a959] transition-colors">
                G & C
              </span>
            </button>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(1).map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="relative px-4 py-2 font-sans text-sm text-white/70 hover:text-white transition-colors group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#c9a959] group-hover:w-2/3 transition-all duration-300" />
                </button>
              ))}

              {/* RSVP button highlighted */}
              <button
                onClick={() => scrollToSection("#rsvp")}
                className="ml-4 px-5 py-2 bg-[#c9a959] text-[#0a1628] font-sans text-sm font-medium rounded-full hover:bg-[#d4b76a] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#c9a959]/30"
              >
                Confirmar
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              ref={menuBtnRef}
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => handleMenuBtnHover(true)}
              onMouseLeave={() => handleMenuBtnHover(false)}
              className="lg:hidden w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <div className="mobile-nav-overlay fixed inset-0 bg-[#0a1628]/98 backdrop-blur-xl z-40 lg:hidden">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative elements */}
          <div className="mobile-nav-deco absolute top-20 left-10 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" stroke="#c9a959" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="mobile-nav-deco absolute bottom-20 right-10 opacity-20">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#c9a959" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
            {/* Logo */}
            <div className="mobile-nav-item mb-6">
              <AnimatedHeart className="w-10 h-10" />
            </div>

            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="mobile-nav-item font-serif text-3xl text-white hover:text-[#c9a959] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#c9a959] group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Bottom decoration */}
            <div className="mobile-nav-deco mt-8">
              <svg
                viewBox="0 0 100 20"
                className="w-32 text-[#c9a959]/30"
                fill="none"
                stroke="currentColor"
              >
                <path d="M0 10 Q25 0 50 10 Q75 20 100 10" strokeWidth="1" />
                <circle cx="50" cy="10" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

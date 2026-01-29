"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated Dress Icon
function AnimatedDress({ className = "w-12 h-12" }: { className?: string }) {
  const dressRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".dress-skirt", {
        skewX: 3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, dressRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={dressRef} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C10.9 2 10 2.9 10 4C10 4.7 10.4 5.4 10.9 5.7L8 10H6L4 22H20L18 10H16L13.1 5.7C13.6 5.4 14 4.7 14 4C14 2.9 13.1 2 12 2Z" />
      <path className="dress-skirt" d="M8 10L4 22H20L16 10H8Z" opacity="0.8" />
    </svg>
  );
}

// Animated Suit Icon
function AnimatedSuit({ className = "w-12 h-12" }: { className?: string }) {
  const suitRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".tie", {
        rotation: 5,
        transformOrigin: "top center",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, suitRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={suitRef} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2L2 8V22H22V8L18 2H6Z" opacity="0.9" />
      <path className="tie" d="M12 6L10 10L12 20L14 10L12 6Z" fill="#c9a959" />
      <path d="M9 2L6 8H18L15 2H9Z" opacity="0.7" />
    </svg>
  );
}

export function DressCode({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".dresscode-title-char",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".dresscode-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card entrance
      gsap.fromTo(
        ".dresscode-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".dresscode-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Color swatches pop animation
      gsap.fromTo(
        ".color-swatch",
        { scale: 0, opacity: 0, rotation: -90 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".color-swatches",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Instructions reveal
      gsap.fromTo(
        ".dresscode-instruction",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".dresscode-instructions",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for icons
      gsap.to(".floating-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Hover effects for color swatches
      gsap.utils.toArray(".color-swatch").forEach((swatch: any) => {
        swatch.addEventListener("mouseenter", () => {
          gsap.to(swatch, { scale: 1.15, y: -5, duration: 0.3 });
        });
        swatch.addEventListener("mouseleave", () => {
          gsap.to(swatch, { scale: 1, y: 0, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "Codigo de Vestimenta";

  return (
    <section id={id} ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-32 px-6 bg-[#0a1628] overflow-hidden snap-start">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/95 to-[#0f172a] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title with character animation */}
        <div className="dresscode-title text-center mb-12 overflow-hidden">
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            {title.split("").map((char, i) => (
              <span
                key={i}
                className="dresscode-title-char inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
            <div className="w-2 h-2 rounded-full bg-[#c9a959]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
          </div>
          <p className="text-white/60 font-sans mt-6 text-lg">
            Te pedimos vestir de manera formal siguiendo nuestra paleta de colores
          </p>
        </div>

        {/* Main card */}
        <div className="dresscode-card bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#c9a959]/20 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#c9a959]/20 rounded-bl-3xl" />

          {/* Formal badge */}
          <div className="text-center mb-10">
            <span className="inline-block px-6 py-2 bg-[#0a1628] text-white font-sans text-sm tracking-widest uppercase rounded-full border border-white/20">
              Formal / Etiqueta
            </span>
          </div>

          {/* Color swatches */}
          <div className="color-swatches flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
            <div className="color-swatch flex flex-col items-center gap-3 cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0a1628] shadow-xl border-4 border-white transform transition-transform duration-300 hover:scale-110 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <span className="text-sm font-sans text-white/70 font-medium">Azul Marino</span>
            </div>
            <div className="color-swatch flex flex-col items-center gap-3 cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl border-4 border-[#e2e8f0] transform transition-transform duration-300 hover:scale-110 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent" />
              </div>
              <span className="text-sm font-sans text-white/70 font-medium">Blanco</span>
            </div>
            <div className="color-swatch flex flex-col items-center gap-3 cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#c9a959] to-[#b8963d] shadow-xl border-4 border-white transform transition-transform duration-300 hover:scale-110 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              </div>
              <span className="text-sm font-sans text-white/70 font-medium">Dorado</span>
            </div>
          </div>

          {/* Instructions with icons */}
          <div className="dresscode-instructions grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="dresscode-instruction flex items-start gap-4 p-5 bg-[#0a1628]/40 rounded-2xl border border-white/5 hover:border-[#c9a959]/30 transition-colors">
              <div className="floating-icon w-14 h-14 rounded-xl bg-[#c9a959]/10 flex items-center justify-center shrink-0">
                <AnimatedDress className="w-8 h-8 text-[#c9a959]" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white mb-1">Damas</h4>
                <p className="text-white/60 font-sans text-sm leading-relaxed">
                  Vestido largo o coctel en tonos azul marino, blanco, plateado o dorado
                </p>
              </div>
            </div>

            <div className="dresscode-instruction flex items-start gap-4 p-5 bg-[#0a1628]/40 rounded-2xl border border-white/5 hover:border-[#c9a959]/30 transition-colors">
              <div className="floating-icon w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <AnimatedSuit className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white mb-1">Caballeros</h4>
                <p className="text-white/60 font-sans text-sm leading-relaxed">
                  Traje formal en tonos oscuros, preferentemente azul marino
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 text-white/50 font-sans text-sm bg-[#c9a959]/10 px-5 py-2 rounded-full border border-[#c9a959]/20">
              <span className="w-2 h-2 rounded-full bg-[#c9a959]" />
              Por favor evitar el color blanco en vestidos largos (reservado para la novia)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

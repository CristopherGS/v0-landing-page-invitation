"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedCalendar, AnimatedClock, AnimatedPin } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

import { Navigation, MapPin } from "lucide-react";

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  googleMapsLink?: string;
  wazeLink?: string;
  delay: number;
}

function DetailCard({ icon, title, details, googleMapsLink, wazeLink, delay }: DetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = false;
    if (prefersReducedMotion) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanupFns: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // Hover animations
      const card = cardRef.current;
      if (card && canHover) {
        const onEnter = () => {
          const iconEl = card.querySelector(".card-icon");
          const glowEl = card.querySelector(".card-glow");
          gsap.to(card, { y: -10, scale: 1.02, duration: 0.4, ease: "power2.out" });
          if (iconEl) gsap.to(iconEl, { scale: 1.2, rotation: 10, duration: 0.4 });
          if (glowEl) gsap.to(glowEl, { opacity: 1, duration: 0.4 });
        };
        const onLeave = () => {
          const iconEl = card.querySelector(".card-icon");
          const glowEl = card.querySelector(".card-glow");
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
          if (iconEl) gsap.to(iconEl, { scale: 1, rotation: 0, duration: 0.4 });
          if (glowEl) gsap.to(glowEl, { opacity: 0, duration: 0.4 });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      }
    });
    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="detail-card relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-[#13213a] to-[#0a1628] rounded-3xl shadow-xl border border-white/10 overflow-hidden cursor-default"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow effect */}
      <div className="card-glow pointer-events-none absolute inset-0 bg-gradient-to-t from-[#c9a959]/20 to-transparent opacity-0 transition-opacity" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Icon container */}
        <div className="card-icon relative w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#0a1628] mb-6 shadow-lg">
          {icon}
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#c9a959]/30 animate-ping" style={{ animationDuration: "2s" }} />
        </div>

        <h3 className="font-serif text-2xl text-white mb-4">{title}</h3>

        {details.map((detail, index) => (
          <p
            key={index}
            className="text-white/70 font-sans text-sm leading-relaxed"
          >
            {detail}
          </p>
        ))}

        {/* Navigation Buttons */}
        {(googleMapsLink || wazeLink) && (
          <div className="mt-6 flex flex-wrap justify-center gap-3 w-full">
            {wazeLink && (
              <a
                href={wazeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#0a1628] hover:bg-[#1e3a5f] text-white text-xs font-bold transition-all border border-white/10 flex-1 min-w-[100px]"
              >
                <Navigation className="w-3 h-3" />
                Waze
              </a>
            )}
            {googleMapsLink && (
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold transition-all flex-1 min-w-[100px]"
              >
                <MapPin className="w-3 h-3" />
                Maps
              </a>
            )}
          </div>
        )}
      </div>

      {/* Corner accents */}
      <div className="pointer-events-none absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#c9a959]/20 rounded-tr-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#c9a959]/20 rounded-bl-3xl" />
    </div>
  );
}

export function EventDetails({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const receptionAddress = "Salon de Eventos Gadzi, San Mateo, Quetzaltenango, Guatemala";
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(receptionAddress)}`;
  const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(receptionAddress)}&navigate=yes`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text
      gsap.fromTo(
        ".event-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards entrance with stagger
      gsap.fromTo(
        ".detail-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".details-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Map reveal animation
      const mapContainer = sectionRef.current?.querySelector(".map-container");
      if (mapContainer) {
        gsap.fromTo(
          mapContainer,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapContainer,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Decorative lines animation
      gsap.fromTo(
        ".deco-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-20 px-6 bg-[#0a1628] overflow-hidden snap-start">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/95 to-[#0f172a] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title section */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-serif text-4xl md:text-6xl text-white mb-4 overflow-hidden"
          >
            <span className="event-title-word inline-block">Detalles</span>{" "}
            <span className="event-title-word inline-block">del</span>{" "}
            <span className="event-title-word inline-block">Evento</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="deco-line h-px w-20 bg-gradient-to-r from-transparent to-[#c9a959]/50 origin-left" />
            <div className="w-2 h-2 rounded-full bg-[#c9a959]" />
            <div className="deco-line h-px w-20 bg-gradient-to-l from-transparent to-[#c9a959]/50 origin-right" />
          </div>

          <p className="text-white/60 font-sans mt-6 text-lg">
            Toda la informacion que necesitas saber
          </p>
        </div>

        {/* Cards grid */}
        <div className="details-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          <DetailCard
            icon={<AnimatedCalendar className="w-10 h-10" />}
            title="Fecha"
            details={["Sabado", "11 de Abril, 2026"]}
            delay={0}
          />
          <DetailCard
            icon={<AnimatedClock className="w-10 h-10" />}
            title="Hora"
            details={["Recepcion: 15:00 hrs"]}
            delay={150}
          />
          <DetailCard
            icon={<AnimatedPin className="w-10 h-10" />}
            title="Recepcion"
            details={["Salon de Eventos Gadzi", "GADZI, San Mateo, Quetzaltenango, Guatemala"]}
            googleMapsLink={googleMapsLink}
            wazeLink={wazeLink}
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}

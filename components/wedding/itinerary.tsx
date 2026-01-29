"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Church, Utensils, Music, Camera, Cake, Heart, PartyPopper, Wine } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const itineraryItems = [
  {
    time: "16:00",
    title: "Ceremonia Religiosa",
    description: "Parroquia San Antonio",
    icon: Church,
    color: "#c9a959",
  },
  {
    time: "17:30",
    title: "Sesion de Fotos",
    description: "Fotos con familiares y amigos",
    icon: Camera,
    color: "#4a90a4",
  },
  {
    time: "18:00",
    title: "Coctel de Bienvenida",
    description: "Salon de Eventos Luna",
    icon: Wine,
    color: "#8b5a8b",
  },
  {
    time: "19:00",
    title: "Recepcion",
    description: "Entrada de los novios",
    icon: Heart,
    color: "#c9a959",
  },
  {
    time: "20:00",
    title: "Cena",
    description: "Banquete principal",
    icon: Utensils,
    color: "#5a8b6a",
  },
  {
    time: "21:30",
    title: "Primer Baile",
    description: "Baile de los novios",
    icon: Music,
    color: "#a45a5a",
  },
  {
    time: "22:00",
    title: "Pastel de Bodas",
    description: "Corte del pastel",
    icon: Cake,
    color: "#d4a574",
  },
  {
    time: "22:30",
    title: "Fiesta",
    description: "A bailar toda la noche",
    icon: PartyPopper,
    color: "#6a5acd",
  },
];

export function Itinerary() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".itinerary-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".itinerary-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline line draw animation
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".itinerary-timeline",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Items stagger animation
      gsap.fromTo(
        ".itinerary-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".itinerary-timeline",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline dots pulse animation
      gsap.utils.toArray(".timeline-dot").forEach((dot: any, index) => {
        gsap.to(dot, {
          scale: 1.3,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      });

      // Icons float animation
      gsap.utils.toArray(".item-icon").forEach((icon: any) => {
        gsap.to(icon, {
          y: -3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Hover effects for items
      gsap.utils.toArray(".itinerary-item").forEach((item: any) => {
        const card = item.querySelector(".item-card");
        const icon = item.querySelector(".item-icon");
        
        item.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.03, y: -5, duration: 0.3 });
          gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3 });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3 });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f8fafc] to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="itinerary-title text-center mb-16 overflow-hidden">
          <h2 className="font-serif text-4xl md:text-6xl text-[#0a1628] mb-4">
            <span className="itinerary-title-word inline-block">Itinerario</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
            <div className="w-2 h-2 rounded-full bg-[#c9a959]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
          </div>
          <p className="text-[#0a1628]/60 font-sans mt-6 text-lg">
            Programa del dia
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="itinerary-timeline relative">
          {/* Central line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a959] via-[#0a1628]/20 to-[#c9a959] md:-translate-x-1/2 origin-top" />

          {itineraryItems.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`itinerary-item relative flex items-center gap-6 mb-8 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="timeline-dot absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#c9a959] z-10 md:-translate-x-1/2 shadow-lg"
                  style={{ boxShadow: `0 0 20px ${item.color}40` }}
                />

                {/* Content card */}
                <div
                  className={`flex-1 pl-12 md:pl-0 ${
                    isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                  }`}
                >
                  <div
                    className={`item-card inline-block bg-gradient-to-br from-[#f8fafc] to-white rounded-2xl p-6 border border-[#0a1628]/5 shadow-lg cursor-default ${
                      isLeft ? "md:mr-0" : "md:ml-0"
                    }`}
                  >
                    <div className={`flex items-center gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                      {/* Icon */}
                      <div
                        className="item-icon w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: item.color }} />
                      </div>
                      
                      {/* Text */}
                      <div className={isLeft ? "md:text-right" : ""}>
                        <span
                          className="font-sans font-bold text-lg block"
                          style={{ color: item.color }}
                        >
                          {item.time}
                        </span>
                        <h3 className="font-serif text-xl text-[#0a1628] mt-1">
                          {item.title}
                        </h3>
                        <p className="text-[#0a1628]/50 font-sans text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <svg
            viewBox="0 0 200 30"
            className="w-40 mx-auto text-[#0a1628]/10"
            fill="none"
            stroke="currentColor"
          >
            <path d="M0 15 Q50 5 100 15 Q150 25 200 15" strokeWidth="1" />
            <circle cx="100" cy="15" r="4" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}

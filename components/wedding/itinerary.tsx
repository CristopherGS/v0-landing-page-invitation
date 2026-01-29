"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Church, Utensils, Music, Camera, Cake, Heart, PartyPopper } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const itineraryItems = [
  {
    time: "16:00",
    title: "Ceremonia Religiosa",
    description: "Parroquia San Antonio",
    icon: Church,
  },
  {
    time: "17:30",
    title: "Sesion de Fotos",
    description: "Fotos con familiares y amigos",
    icon: Camera,
  },
  {
    time: "18:00",
    title: "Coctel de Bienvenida",
    description: "Salon de Eventos Luna",
    icon: Utensils,
  },
  {
    time: "19:00",
    title: "Recepcion",
    description: "Entrada de los novios",
    icon: Heart,
  },
  {
    time: "20:00",
    title: "Cena",
    description: "Banquete principal",
    icon: Utensils,
  },
  {
    time: "21:30",
    title: "Primer Baile",
    description: "Baile de los novios",
    icon: Music,
  },
  {
    time: "22:00",
    title: "Pastel de Bodas",
    description: "Corte del pastel",
    icon: Cake,
  },
  {
    time: "22:30",
    title: "Fiesta",
    description: "A bailar toda la noche",
    icon: PartyPopper,
  },
];

export function Itinerary() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".itinerary-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".itinerary-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".itinerary-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".itinerary-timeline",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="itinerary-title font-serif text-4xl md:text-5xl text-center text-[#0a1628] mb-4">
          Itinerario
        </h2>
        <p className="text-center text-[#0a1628]/60 font-sans mb-16">
          Programa del dia
        </p>

        <div className="itinerary-timeline relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#0a1628]/10 md:-translate-x-1/2" />

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
                {/* Time badge for mobile */}
                <div className="md:hidden absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#c9a959] z-10" />

                {/* Content card */}
                <div
                  className={`flex-1 pl-12 md:pl-0 ${
                    isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <div
                    className={`inline-block bg-[#f8fafc] rounded-xl p-6 border border-[#0a1628]/5 ${
                      isLeft ? "md:mr-0" : "md:ml-0"
                    }`}
                  >
                    <span className="text-[#c9a959] font-sans font-semibold text-lg">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-xl text-[#0a1628] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-[#0a1628]/60 font-sans text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center icon for desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a1628] items-center justify-center text-white z-10">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

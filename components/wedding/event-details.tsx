"use client";

import React from "react"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Calendar, Church, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  mapLink?: string;
}

function DetailCard({ icon, title, details, mapLink }: DetailCardProps) {
  return (
    <div className="detail-card flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg border border-[#0a1628]/5">
      <div className="w-16 h-16 rounded-full bg-[#0a1628] flex items-center justify-center text-white mb-5">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-[#0a1628] mb-3">{title}</h3>
      {details.map((detail, index) => (
        <p
          key={index}
          className="text-[#0a1628]/60 font-sans text-sm leading-relaxed"
        >
          {detail}
        </p>
      ))}
      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[#0a1628] font-sans text-sm hover:text-[#c9a959] transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Ver en Google Maps
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

export function EventDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".detail-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".details-grid",
            start: "top 75%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-4xl md:text-5xl text-center text-[#0a1628] mb-4"
        >
          Detalles del Evento
        </h2>
        <p className="text-center text-[#0a1628]/60 font-sans mb-16">
          Toda la informacion que necesitas saber
        </p>

        <div className="details-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DetailCard
            icon={<Calendar className="w-7 h-7" />}
            title="Fecha"
            details={["Lunes", "15 de Junio, 2026"]}
          />
          <DetailCard
            icon={<Clock className="w-7 h-7" />}
            title="Hora"
            details={["Ceremonia: 16:00 hrs", "Recepcion: 18:00 hrs"]}
          />
          <DetailCard
            icon={<Church className="w-7 h-7" />}
            title="Ceremonia"
            details={["Parroquia San Antonio", "Calle Principal #123"]}
            mapLink="https://maps.google.com/?q=Parroquia+San+Antonio"
          />
          <DetailCard
            icon={<MapPin className="w-7 h-7" />}
            title="Recepcion"
            details={["Salon de Eventos Luna", "Av. Central #456"]}
            mapLink="https://maps.google.com/?q=Salon+de+Eventos+Luna"
          />
        </div>

        {/* Map embed */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-[#0a1628]/5">
          <div className="aspect-[16/9] md:aspect-[21/9] bg-[#e2e8f0] flex items-center justify-center">
            {/* Replace with actual Google Maps iframe */}
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-[#0a1628]/30 mx-auto mb-4" />
              <p className="text-[#0a1628]/50 font-sans">
                Aqui ira el mapa de Google Maps
              </p>
              <p className="text-[#0a1628]/40 font-sans text-sm mt-2">
                Reemplaza este div con un iframe de Google Maps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = new Date("2026-06-15T16:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".countdown-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".countdown-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".countdown-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".countdown-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-[#0a1628]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="countdown-title font-serif text-4xl md:text-5xl text-white mb-4">
          Cuenta Regresiva
        </h2>
        <p className="text-white/60 font-sans mb-12">
          Faltan pocos dias para el gran dia
        </p>

        <div className="countdown-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="countdown-item bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <span className="font-serif text-5xl md:text-6xl text-[#c9a959] block">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs md:text-sm tracking-[0.15em] uppercase text-white/60 mt-2 block">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

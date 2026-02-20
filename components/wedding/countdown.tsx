"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeart, AnimatedSparkles, AnimatedRings } from "./animated-icons";
import { useMotionSettings } from "./use-motion-settings";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion, canHover, allowHeavyAnimation } = useMotionSettings();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isWeddingPassed, setIsWeddingPassed] = useState(false);

  const weddingDate = new Date("2026-04-11T16:00:00");

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
        setIsWeddingPassed(false);
      } else {
        setIsWeddingPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cleanupFns: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.set(".countdown-item, .countdown-deco", { willChange: "transform, opacity" });

      gsap.fromTo(
        ".countdown-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".countdown-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".countdown-deco",
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".countdown-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".countdown-item",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".countdown-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (canHover) {
        gsap.utils.toArray<HTMLElement>(".countdown-item").forEach((item) => {
          const onEnter = () => {
            gsap.to(item, { y: -10, scale: 1.05, duration: 0.3 });
            const numberEl = item.querySelector(".countdown-number"); if (numberEl) gsap.to(numberEl, { scale: 1.1, duration: 0.3 });
          };
          const onLeave = () => {
            gsap.to(item, { y: 0, scale: 1, duration: 0.3 });
            const numberEl = item.querySelector(".countdown-number"); if (numberEl) gsap.to(numberEl, { scale: 1, duration: 0.3 });
          };
          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
          cleanupFns.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      if (allowHeavyAnimation) {
        gsap.to(".countdown-bg-pattern", {
          backgroundPosition: "100px 100px",
          duration: 28,
          repeat: -1,
          ease: "linear",
        });

        gsap.to(".floating-deco", {
          y: -10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.8,
        });
      }
    }, sectionRef);

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, [allowHeavyAnimation, canHover, prefersReducedMotion]);

  const timeUnits = [
    { value: timeLeft.days, label: "Dias", suffix: "d" },
    { value: timeLeft.hours, label: "Horas", suffix: "h" },
    { value: timeLeft.minutes, label: "Minutos", suffix: "m" },
    { value: timeLeft.seconds, label: "Segundos", suffix: "s" },
  ];

  return (
    <section id={id} ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-32 px-4 md:px-6 bg-[#0a1628] overflow-hidden snap-start">
      {/* Animated background pattern */}
      <div
        className="countdown-bg-pattern absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative corner elements */}
      <div className="absolute top-10 left-10 countdown-deco floating-deco">
        <AnimatedSparkles className="w-12 h-12 md:w-16 md:h-16 opacity-30" />
      </div>
      <div className="absolute bottom-10 right-10 countdown-deco floating-deco">
        <AnimatedSparkles className="w-12 h-12 md:w-16 md:h-16 opacity-30" />
      </div>
      <div className="absolute top-20 right-20 floating-deco opacity-20">
        <AnimatedRings className="w-20 h-12" />
      </div>
      <div className="absolute bottom-20 left-20 floating-deco opacity-20">
        <AnimatedRings className="w-20 h-12" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {isWeddingPassed ? (
          // Already married state
          <div className="py-12">
            <div className="mb-8">
              <AnimatedRings className="w-32 h-20 mx-auto mb-6" />
            </div>
            <div className="countdown-title overflow-hidden mb-6">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white">
                <span className="countdown-title-word inline-block text-[#c9a959]">Ya</span>{" "}
                <span className="countdown-title-word inline-block">Estamos</span>{" "}
                <span className="countdown-title-word inline-block text-[#c9a959]">Casados</span>
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
              <AnimatedHeart className="w-8 h-8" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
            </div>
            <p className="text-white/70 font-serif text-2xl md:text-3xl mb-4">
              Gabriela & Cristopher
            </p>
            <p className="text-[#c9a959] font-sans text-lg tracking-wider">
              11 de Abril, 2026
            </p>
            <p className="text-white/50 font-sans mt-6 text-lg max-w-xl mx-auto">
              Gracias por ser parte de nuestro dia especial. Los llevamos siempre en nuestro corazon.
            </p>
          </div>
        ) : (
          <>
            {/* Title with word reveal */}
            <div className="countdown-title overflow-hidden mb-4">
              <h2 className="font-serif text-4xl md:text-6xl text-white inline-flex flex-wrap justify-center gap-x-4">
                <span className="countdown-title-word inline-block">Cuenta</span>
                <span className="countdown-title-word inline-block">Regresiva</span>
              </h2>
            </div>

            <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
              <AnimatedHeart className="w-5 h-5" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
            </div>

            <p className="text-white/50 font-sans mb-8 text-lg">
              Faltan pocos dias para el gran dia
            </p>

            {/* Countdown grid */}
            <div className="countdown-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {timeUnits.map((unit, index) => (
                <div
                  key={index}
                  className="countdown-item group relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/10 cursor-default overflow-hidden"
                >
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a959]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Number with flip animation effect */}
                  <div className="relative">
                    <span className="countdown-number font-serif text-4xl md:text-7xl text-[#c9a959] block transition-transform duration-300">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 mt-3 block">
                      {unit.label}
                    </span>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c9a959]/30 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c9a959]/30 rounded-bl-2xl" />
                </div>
              ))}
            </div>

            {/* Wedding date reminder */}
            <div className="mt-12 inline-block px-8 py-4 bg-white/5 rounded-full border border-[#c9a959]/20">
              <span className="font-sans text-sm text-white/60">Sabado, </span>
              <span className="font-serif text-xl text-[#c9a959]">11 de Abril, 2026</span>
            </div>
          </>
        )}

        {/* Bottom decoration */}
        <div className="mt-12 md:mt-16">
          <svg
            viewBox="0 0 300 20"
            className="w-48 md:w-64 mx-auto text-[#c9a959]/30"
            fill="none"
            stroke="currentColor"
          >
            <path d="M0 10 Q75 0 150 10 Q225 20 300 10" strokeWidth="1" />
            <circle cx="150" cy="10" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}

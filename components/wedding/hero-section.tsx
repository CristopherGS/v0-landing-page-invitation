"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ornamentRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2 }
      )
        .fromTo(
          photoFrameRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          dateRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a1628] text-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#1e3a5f]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1e3a5f]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Top ornament */}
      <div ref={ornamentRef} className="mb-6">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="text-[#c9a959]">
          <path d="M40 0 C20 0 0 20 0 20 C0 20 20 40 40 40 C60 40 80 20 80 20 C80 20 60 0 40 0 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
          <path d="M40 8 C25 8 10 20 10 20 C10 20 25 32 40 32 C55 32 70 20 70 20 C70 20 55 8 40 8 Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <circle cx="40" cy="20" r="4" fill="currentColor"/>
        </svg>
      </div>

      {/* Photo frame placeholder */}
      <div ref={photoFrameRef} className="relative mb-8">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[#c9a959]/60 overflow-hidden bg-[#1e3a5f]/30 flex items-center justify-center">
          {/* Replace this div with your couple's photo */}
          <div className="w-full h-full flex items-center justify-center text-white/40 text-center p-4 font-sans text-sm">
            <span>Foto de los novios</span>
          </div>
        </div>
        <div className="absolute -inset-3 rounded-full border border-[#c9a959]/30" />
        <div className="absolute -inset-6 rounded-full border border-[#c9a959]/15" />
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center px-4">
        <span className="block font-sans text-sm md:text-base tracking-[0.4em] uppercase mb-3 text-[#c9a959]">
          Nuestra Boda
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-balance">
          Maria & Carlos
        </h1>
      </div>

      {/* Date */}
      <p
        ref={dateRef}
        className="mt-6 font-sans text-lg md:text-xl tracking-[0.2em] uppercase text-white/80"
      >
        15 de Junio, 2026
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-white/50">
          Desliza para ver mas
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#c9a959]"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

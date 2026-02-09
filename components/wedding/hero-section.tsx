"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeart, FloatingParticles } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ornamentTopRef = useRef<HTMLDivElement>(null);
  const ornamentBottomRef = useRef<HTMLDivElement>(null);
  const [bgError, setBgError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Rings Animation Setup
      gsap.set(".hero-ring-left", { x: -60, opacity: 0 });
      gsap.set(".hero-ring-right", { x: 60, opacity: 0 });

      // Rings Animation Sequence (independent of main timeline to start immediately/parallel)
      const ringsTl = gsap.timeline({ delay: 0.5 });
      ringsTl.to([".hero-ring-left", ".hero-ring-right"], {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      })
        .to(".hero-rings-container", {
          scale: 1.1,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        })
        .to(".hero-ring-flash", {
          opacity: 1,
          duration: 0.1
        }, "-=0.4")
        .to(".hero-ring-flash", {
          opacity: 0,
          duration: 0.4
        });

      tl.fromTo(
        ornamentTopRef.current,
        { y: -50, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        "-=1"
      )
        .fromTo(
          dateRef.current,
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ornamentBottomRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const brideName = "Cristopher";
  const groomName = "Gabriela";

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#0a1628] text-white overflow-hidden snap-start py-20 px-4"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Photo */}
        <div className="absolute inset-0">
          {!bgError && (
            <Image
              src="/assets/placeholder-user.jpg"
              alt="Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-50"
              onError={() => setBgError(true)}
            />
          )}
        </div>

        {/* Fallback Gradient (visible if image fails or behind image) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0a1628] -z-10" />

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Animated Particles - Reduced opacity for subtle effect */}
        <div className="opacity-60">
          <FloatingParticles />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full max-w-4xl mx-auto">

        {/* Top Ornament */}
        <div ref={ornamentTopRef} className="mb-8 opacity-0">
          <AnimatedHeart className="w-12 h-12 text-[#c9a959]" />
        </div>

        <div className="relative text-center flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto md:mt-0">

          {/* Animated Rings - Hero Version */}
          <div className="hero-rings-container relative h-24 w-40 mb-8 flex items-center justify-center">
            {/* Left Ring */}
            <div className="hero-ring-left absolute opacity-0">
              <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="30" stroke="#c9a959" strokeWidth="3" />
                <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M20 20 Q40 10 60 20" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
              </svg>
            </div>

            {/* Right Ring */}
            <div className="hero-ring-right absolute opacity-0">
              <svg width="60" height="60" viewBox="0 0 80 80" fill="none" style={{ transform: "rotate(180deg)" }}>
                <circle cx="40" cy="40" r="30" stroke="#c9a959" strokeWidth="3" />
                <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M20 20 Q40 10 60 20" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
              </svg>
            </div>

            {/* Flash effect */}
            <div className="hero-ring-flash absolute w-1 h-1 bg-white shadow-[0_0_30px_15px_white] rounded-full opacity-0" />
          </div>

          <p className="subtitle font-sans text-sm md:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-6 text-[#c9a959]">
            Nos Casamos
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-balance leading-tight drop-shadow-2xl">
            <span className="title-word inline-block">Cristopher</span>
            <span className="ampersand text-[#c9a959] mx-2 md:mx-4 inline-block italic font-light">
              &
            </span>
            <span className="title-word inline-block">Gabriela</span>
          </h1>
        </div>

        {/* Date Display */}
        <div ref={dateRef} className="mt-10 md:mt-12 flex flex-col items-center gap-4 relative">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a959] to-transparent" />
          <p className="font-serif text-2xl md:text-3xl text-white tracking-widest uppercase">
            11 . 07 . 2026
          </p>
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-white/60">
            Quetzaltenango, Guatemala
          </p>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Descubre</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#c9a959] rounded-full animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
}

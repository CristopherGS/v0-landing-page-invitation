"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedRings, AnimatedHeart, FloatingParticles } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const ornamentTopRef = useRef<HTMLDivElement>(null);
  const ornamentBottomRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".bg-circle",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2 }
      )
        .fromTo(
          ornamentTopRef.current,
          { y: -50, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 1 },
          "-=1"
        )
        .fromTo(
          photoFrameRef.current,
          { scale: 0, opacity: 0, rotation: -10 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" },
          "-=0.6"
        )
        .fromTo(
          ".photo-ring",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.8"
        )
        .fromTo(
          ".title-char",
          { y: 100, opacity: 0, rotationX: -90 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.03 },
          "-=0.4"
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

      gsap.to(".bg-circle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      gsap.to(scrollIndicatorRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });

      gsap.to(photoFrameRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".photo-ring-1", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".photo-ring-2", {
        rotation: -360,
        duration: 40,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".parallax-slow", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-fast", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animate decorative leaves
      gsap.to(".leaf-left", {
        rotation: 5,
        x: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".leaf-right", {
        rotation: -5,
        x: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const brideName = "Cristopher";
  const groomName = "Gabriela";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a1628] text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <div ref={bgElementsRef} className="absolute inset-0 overflow-hidden">
        <div className="bg-circle parallax-slow absolute top-[10%] left-[10%] w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-[#1e3a5f]/30 to-transparent rounded-full blur-3xl" />
        <div className="bg-circle parallax-fast absolute bottom-[20%] right-[5%] w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tl from-[#c9a959]/10 to-transparent rounded-full blur-3xl" />
        <div className="bg-circle absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a5f]/5 rounded-full blur-3xl" />
        {/* Extra decorative circles */}
        <div className="bg-circle absolute top-[30%] right-[20%] w-32 h-32 bg-gradient-to-br from-[#c9a959]/5 to-transparent rounded-full blur-2xl" />
        <div className="bg-circle absolute bottom-[40%] left-[15%] w-48 h-48 bg-gradient-to-tr from-[#1e3a5f]/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Decorative leaf patterns */}
      <svg className="leaf-left absolute left-4 md:left-10 top-1/4 w-16 md:w-24 h-auto opacity-20" viewBox="0 0 100 200" fill="none">
        <path d="M50 0 Q20 50 50 100 Q80 150 50 200" stroke="#c9a959" strokeWidth="1" fill="none"/>
        <path d="M50 20 Q30 50 50 80" stroke="#c9a959" strokeWidth="0.5" fill="none"/>
        <path d="M50 60 Q70 90 50 120" stroke="#c9a959" strokeWidth="0.5" fill="none"/>
        <circle cx="50" cy="50" r="3" fill="#c9a959"/>
        <circle cx="50" cy="100" r="2" fill="#c9a959"/>
        <circle cx="50" cy="150" r="3" fill="#c9a959"/>
      </svg>
      <svg className="leaf-right absolute right-4 md:right-10 top-1/4 w-16 md:w-24 h-auto opacity-20 transform scale-x-[-1]" viewBox="0 0 100 200" fill="none">
        <path d="M50 0 Q20 50 50 100 Q80 150 50 200" stroke="#c9a959" strokeWidth="1" fill="none"/>
        <path d="M50 20 Q30 50 50 80" stroke="#c9a959" strokeWidth="0.5" fill="none"/>
        <path d="M50 60 Q70 90 50 120" stroke="#c9a959" strokeWidth="0.5" fill="none"/>
        <circle cx="50" cy="50" r="3" fill="#c9a959"/>
        <circle cx="50" cy="100" r="2" fill="#c9a959"/>
        <circle cx="50" cy="150" r="3" fill="#c9a959"/>
      </svg>

      {/* Animated dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top decorative element */}
      <div ref={ornamentTopRef} className="mb-4 parallax-slow">
        <AnimatedRings className="w-24 h-16 md:w-32 md:h-20" />
      </div>

      {/* Photo frame with animated rings */}
      <div ref={photoFrameRef} className="relative mb-6 md:mb-8">
        {/* Outer animated ring */}
        <div className="photo-ring photo-ring-1 absolute -inset-6 md:-inset-8 rounded-full border border-[#c9a959]/20" />
        {/* Inner animated ring */}
        <div className="photo-ring photo-ring-2 absolute -inset-3 md:-inset-4 rounded-full border border-dashed border-[#c9a959]/30" />
        
        {/* Main photo frame */}
        <div className="w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-[#c9a959]/60 overflow-hidden bg-gradient-to-br from-[#1e3a5f]/50 to-[#0a1628]/50 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-black/30">
          <div className="w-full h-full flex items-center justify-center text-white/40 text-center p-6 font-sans text-sm">
            <span>Foto de los novios</span>
          </div>
        </div>

        {/* Corner decorations with flowers */}
        <div className="absolute -top-2 -left-2 w-8 h-8">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#c9a959]">
            <circle cx="20" cy="10" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="10" cy="20" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="15" cy="15" r="5" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 transform scale-x-[-1]">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#c9a959]">
            <circle cx="20" cy="10" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="10" cy="20" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="15" cy="15" r="5" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 transform scale-y-[-1]">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#c9a959]">
            <circle cx="20" cy="10" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="10" cy="20" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="15" cy="15" r="5" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 transform scale-[-1]">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#c9a959]">
            <circle cx="20" cy="10" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="10" cy="20" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="15" cy="15" r="5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Title with character animation */}
      <div ref={titleRef} className="text-center px-4 relative z-10">
        <span className="block font-sans text-xs md:text-sm tracking-[0.5em] uppercase mb-4 text-[#c9a959]">
          Nos Casamos
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-balance">
          <span className="inline-block">
            {brideName.split("").map((char, i) => (
              <span key={i} className="title-char inline-block">
                {char}
              </span>
            ))}
          </span>
          <span className="title-char inline-block mx-2 md:mx-4">
            <AnimatedHeart className="w-6 h-6 md:w-10 md:h-10 inline-block align-middle" />
          </span>
          <span className="inline-block">
            {groomName.split("").map((char, i) => (
              <span key={i} className="title-char inline-block">
                {char}
              </span>
            ))}
          </span>
        </h1>
      </div>

      {/* Date */}
      <p
        ref={dateRef}
        className="mt-6 md:mt-8 font-sans text-lg md:text-xl tracking-[0.3em] uppercase text-white/80"
      >
        11 de Julio, 2026
      </p>

      {/* Bottom ornament */}
      <div ref={ornamentBottomRef} className="mt-8">
        <svg
          width="240"
          height="40"
          viewBox="0 0 240 40"
          fill="none"
          className="text-[#c9a959]/50"
        >
          <path
            d="M0 20 Q60 5 120 20 Q180 35 240 20"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="120" cy="20" r="5" fill="currentColor" />
          <circle cx="60" cy="12" r="3" fill="currentColor" />
          <circle cx="180" cy="28" r="3" fill="currentColor" />
          {/* Small decorative dots */}
          <circle cx="30" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="90" cy="14" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="150" cy="26" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="210" cy="24" r="1.5" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>

      {/* Save the date text */}
      <div className="mt-6 px-6 py-2 border border-[#c9a959]/30 rounded-full">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#c9a959]/70">
          Save the Date
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40">
          Desliza
        </span>
        <div className="relative">
          <svg
            width="28"
            height="42"
            viewBox="0 0 28 42"
            fill="none"
            className="text-[#c9a959]"
          >
            <rect
              x="1"
              y="1"
              width="26"
              height="40"
              rx="13"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle className="animate-bounce" cx="14" cy="12" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}

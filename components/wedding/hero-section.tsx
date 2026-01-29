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
      className="relative h-screen w-full flex flex-col items-center justify-center bg-[#0a1628] text-white overflow-hidden snap-start"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <img
            src="/assets/placeholder-user.jpg"
            alt="Background"
            className="w-full h-full object-cover object-center opacity-50"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.background = 'linear-gradient(to bottom right, #0f172a, #1e3a5f, #0a1628)';
            }}
          />
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

        <div ref={titleRef}>
          <span className="block font-sans text-xs md:text-sm tracking-[0.5em] uppercase mb-6 text-[#c9a959] opacity-80">
            Nos Casamos
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-balance leading-tight drop-shadow-2xl">
            <span className="inline-block text-white">
              {brideName}
            </span>
            <span className="block md:inline mx-4 text-[#c9a959] font-light italic text-4xl md:text-6xl my-2 md:my-0">
              &
            </span>
            <span className="inline-block text-white">
              {groomName}
            </span>
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

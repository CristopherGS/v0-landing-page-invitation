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
      // Initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate background elements first
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

      // Continuous animations
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

      // Photo frame floating animation
      gsap.to(photoFrameRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Photo rings rotation
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

      // Parallax on scroll
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split title into characters for animation
  const brideName = "Maria";
  const groomName = "Carlos";

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
      </div>

      {/* Floating particles */}
      <FloatingParticles />

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

        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#c9a959]/50 rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#c9a959]/50 rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#c9a959]/50 rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#c9a959]/50 rounded-br-lg" />
      </div>

      {/* Title with character animation */}
      <div ref={titleRef} className="text-center px-4 relative z-10">
        <span className="block font-sans text-xs md:text-sm tracking-[0.5em] uppercase mb-4 text-[#c9a959]">
          Nos Casamos
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-balance">
          <span className="inline-block">
            {brideName.split("").map((char, i) => (
              <span key={i} className="title-char inline-block">
                {char}
              </span>
            ))}
          </span>
          <span className="title-char inline-block mx-3 md:mx-6">
            <AnimatedHeart className="w-8 h-8 md:w-12 md:h-12 inline-block align-middle" />
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
        15 de Junio, 2026
      </p>

      {/* Bottom ornament */}
      <div ref={ornamentBottomRef} className="mt-8">
        <svg
          width="200"
          height="30"
          viewBox="0 0 200 30"
          fill="none"
          className="text-[#c9a959]/50"
        >
          <path
            d="M0 15 Q50 0 100 15 Q150 30 200 15"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="15" r="4" fill="currentColor" />
          <circle cx="60" cy="10" r="2" fill="currentColor" />
          <circle cx="140" cy="20" r="2" fill="currentColor" />
        </svg>
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

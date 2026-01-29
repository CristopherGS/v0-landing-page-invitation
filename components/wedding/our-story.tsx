"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeart, AnimatedFlower } from "./animated-icons";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split
      gsap.fromTo(
        ".story-title-char",
        { y: 100, opacity: 0, rotationY: 90 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".story-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle fade
      gsap.fromTo(
        ".story-subtitle",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".story-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Photos with parallax and stagger
      gsap.utils.toArray(".story-photo").forEach((photo: any, index) => {
        // Entrance animation
        gsap.fromTo(
          photo,
          { 
            scale: 0.8, 
            opacity: 0, 
            y: 60,
            rotation: index % 2 === 0 ? -5 : 5 
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".story-photos",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Parallax on scroll
        gsap.to(photo, {
          y: (index % 2 === 0 ? -30 : 30),
          ease: "none",
          scrollTrigger: {
            trigger: photo,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Hover effect
        photo.addEventListener("mouseenter", () => {
          gsap.to(photo, { scale: 1.05, duration: 0.4, ease: "power2.out" });
          gsap.to(photo.querySelector(".photo-overlay"), { opacity: 1, duration: 0.3 });
        });
        photo.addEventListener("mouseleave", () => {
          gsap.to(photo, { scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(photo.querySelector(".photo-overlay"), { opacity: 0, duration: 0.3 });
        });
      });

      // Text reveal with line animation
      gsap.fromTo(
        ".story-text-line",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".story-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Decorative elements
      gsap.fromTo(
        ".story-deco",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".story-photos",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Nuestra Historia";

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 story-deco opacity-20">
        <AnimatedFlower className="w-20 h-20 md:w-32 md:h-32" color="#0a1628" />
      </div>
      <div className="absolute bottom-20 right-10 story-deco opacity-20">
        <AnimatedFlower className="w-20 h-20 md:w-32 md:h-32" color="#0a1628" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Title with character animation */}
        <div className="story-title text-center overflow-hidden mb-4">
          <h2 className="font-serif text-4xl md:text-6xl text-[#0a1628]">
            {titleText.split("").map((char, i) => (
              <span
                key={i}
                className="story-title-char inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        {/* Subtitle with decorative line */}
        <div className="story-subtitle flex items-center justify-center gap-4 mb-16">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0a1628]/30" />
          <p className="text-[#0a1628]/60 font-sans text-center">
            El amor nos unio y juntos escribimos nuestra historia
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0a1628]/30" />
        </div>

        {/* Photo gallery with mixed sizes */}
        <div className="story-photos grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { num: 1, size: "aspect-[3/4]", title: "Nuestro primer encuentro" },
            { num: 2, size: "aspect-square mt-8", title: "La primera cita" },
            { num: 3, size: "aspect-square", title: "El viaje que lo cambio todo" },
            { num: 4, size: "aspect-[3/4] mt-4", title: "La propuesta" },
          ].map((item) => (
            <div
              key={item.num}
              className={`story-photo ${item.size} bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] rounded-2xl overflow-hidden flex items-center justify-center border border-[#0a1628]/10 cursor-pointer relative group shadow-lg`}
            >
              {/* Photo placeholder */}
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-[#0a1628]/20 mb-2" />
                <span className="text-[#0a1628]/30 font-sans text-xs md:text-sm">
                  Foto {item.num}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="photo-overlay absolute inset-0 bg-[#0a1628]/80 flex items-center justify-center opacity-0 transition-opacity">
                <p className="text-white font-serif text-sm md:text-base px-4 text-center">
                  {item.title}
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a959]/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a959]/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Story text with line reveal */}
        <div className="story-text max-w-3xl mx-auto text-center relative">
          {/* Center decoration */}
          <div className="flex justify-center mb-8">
            <AnimatedHeart className="w-8 h-8" />
          </div>

          <p className="story-text-line text-[#0a1628]/70 font-sans leading-relaxed text-lg md:text-xl">
            Nos conocimos en un momento inesperado, y desde ese dia supimos que habia
            algo especial entre nosotros.
          </p>
          <p className="story-text-line text-[#0a1628]/70 font-sans leading-relaxed text-lg md:text-xl mt-6">
            Despues de tantos momentos compartidos, risas, aventuras y suenos juntos,
            decidimos dar el siguiente paso y unir nuestras vidas para siempre.
          </p>
          <p className="story-text-line text-[#0a1628]/70 font-sans leading-relaxed text-lg md:text-xl mt-6">
            Queremos compartir este momento tan especial contigo, porque formas
            parte importante de nuestra historia.
          </p>

          {/* Bottom decoration */}
          <div className="story-text-line mt-10">
            <svg
              viewBox="0 0 200 30"
              className="w-40 mx-auto text-[#0a1628]/20"
              fill="none"
              stroke="currentColor"
            >
              <path d="M0 15 Q50 5 100 15 Q150 25 200 15" strokeWidth="1" />
              <circle cx="100" cy="15" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

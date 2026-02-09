"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeart, AnimatedFlower } from "./animated-icons";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function OurStory({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanupFns: Array<() => void> = [];
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
      gsap.utils.toArray<HTMLElement>(".story-photo").forEach((photo, index) => {
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
        if (canHover) {
          const onEnter = () => {
            gsap.to(photo, { scale: 1.05, duration: 0.4, ease: "power2.out" });
            gsap.to(photo.querySelector(".photo-overlay"), { opacity: 1, duration: 0.3 });
          };
          const onLeave = () => {
            gsap.to(photo, { scale: 1, duration: 0.4, ease: "power2.out" });
            gsap.to(photo.querySelector(".photo-overlay"), { opacity: 0, duration: 0.3 });
          };
          photo.addEventListener("mouseenter", onEnter);
          photo.addEventListener("mouseleave", onLeave);
          cleanupFns.push(() => {
            photo.removeEventListener("mouseenter", onEnter);
            photo.removeEventListener("mouseleave", onLeave);
          });
        }
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

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const titleText = "Nuestra Historia";

  return (
    <section id={id} ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-20 px-6 bg-[#0f172a] overflow-hidden snap-start">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 story-deco opacity-20">
        <AnimatedFlower className="w-20 h-20 md:w-32 md:h-32" color="#c9a959" />
      </div>
      <div className="absolute bottom-20 right-10 story-deco opacity-20">
        <AnimatedFlower className="w-20 h-20 md:w-32 md:h-32" color="#c9a959" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title with character animation */}
        <div className="story-title text-center overflow-hidden mb-4">
          <h2 className="font-serif text-4xl md:text-6xl text-white">
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
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
          <p className="text-white/60 font-sans text-center">
            El amor nos unio y juntos escribimos nuestra historia
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
        </div>

        {/* Photo gallery with mixed sizes */}
        <div className="story-photos grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { num: 1, size: "aspect-[3/4]", title: "Nuestro primer encuentro", src: "/assets/IMG_2850.jpg" },
            { num: 2, size: "aspect-square mt-8", title: "La primera cita", src: "/assets/IMG_4321.jpg" },
            { num: 3, size: "aspect-square", title: "El viaje que lo cambio todo", src: "/assets/IMG_3458.jpg" },
            { num: 4, size: "aspect-[3/4] mt-4", title: "La propuesta", src: "/assets/IMG_3458.jpg" },
          ].map((item) => (
            <div
              key={item.num}
              className={`story-photo ${item.size} bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 cursor-pointer relative group shadow-lg`}
            >
              {/* Photo Image */}
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              ) : (
                /* Photo placeholder (fallback) */
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Camera className="w-8 h-8 md:w-10 md:h-10 text-white/20 mb-2" />
                  <span className="text-white/30 font-sans text-xs md:text-sm">
                    Foto {item.num}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="photo-overlay absolute inset-0 bg-[#0a1628]/60 flex items-center justify-center opacity-0 transition-opacity z-10">
                <p className="text-white font-serif text-sm md:text-base px-4 text-center">
                  {item.title}
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a959]/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a959]/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            </div>
          ))}
        </div>

        {/* Story text with line reveal */}
        <div className="story-text max-w-3xl mx-auto text-center relative">
          {/* Center decoration */}
          <div className="flex justify-center mb-8">
            <AnimatedHeart className="w-8 h-8 text-[#c9a959]" />
          </div>

          <p className="story-text-line text-white/70 font-sans leading-relaxed text-lg md:text-xl">
            Nos conocimos en un momento inesperado, y desde ese dia supimos que Dios cruzo nuestros caminos con un proposito especial.
          </p>
          <p className="story-text-line text-white/70 font-sans leading-relaxed text-lg md:text-xl mt-6">
            Despues de tantos momentos compartidos, risas y aventuras, con la bendicion de Dios y llenos de fe, decidimos dar el siguiente paso para unir nuestras vidas para siempre.
          </p>
          <p className="story-text-line text-white/70 font-sans leading-relaxed text-lg md:text-xl mt-6">
            Queremos compartir este momento tan especial contigo, porque formas
            parte importante de nuestra historia.
          </p>

          {/* Bottom decoration */}
          <div className="story-text-line mt-10">
            <svg
              viewBox="0 0 200 30"
              className="w-40 mx-auto text-white/20"
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

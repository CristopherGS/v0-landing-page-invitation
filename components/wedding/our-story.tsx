"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".story-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".story-photo",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".story-photos",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".story-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".story-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="story-title font-serif text-4xl md:text-5xl text-center text-[#0a1628] mb-4">
          Nuestra Historia
        </h2>
        <p className="text-center text-[#0a1628]/60 font-sans mb-16 max-w-xl mx-auto">
          El amor nos unio y juntos escribimos nuestra historia
        </p>

        {/* Photo gallery placeholder */}
        <div className="story-photos grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="story-photo aspect-square bg-[#f0f4f8] rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-[#0a1628]/20"
            >
              <span className="text-[#0a1628]/40 font-sans text-sm text-center p-4">
                Foto {num}
              </span>
            </div>
          ))}
        </div>

        {/* Story text */}
        <div className="story-text max-w-3xl mx-auto text-center">
          <p className="text-[#0a1628]/70 font-sans leading-relaxed text-lg">
            Nos conocimos en [lugar/momento], y desde ese dia supimos que habia
            algo especial entre nosotros. Despues de [X] anos juntos, decidimos
            dar el siguiente paso y unir nuestras vidas para siempre.
          </p>
          <p className="text-[#0a1628]/70 font-sans leading-relaxed text-lg mt-4">
            Queremos compartir este momento tan especial contigo, porque formas
            parte importante de nuestra historia.
          </p>
        </div>
      </div>
    </section>
  );
}

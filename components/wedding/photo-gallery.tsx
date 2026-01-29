"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Heart } from "lucide-react";
import { AnimatedHeart } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

export function PhotoGallery({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".gallery-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".gallery-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Gallery items with stagger and scale
      gsap.fromTo(
        ".gallery-item",
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.8,
            from: "random",
          },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover effects for gallery items
      gsap.utils.toArray(".gallery-item").forEach((item: any) => {
        const overlay = item.querySelector(".gallery-overlay");
        const icon = item.querySelector(".gallery-icon");
        const heart = item.querySelector(".gallery-heart");

        item.addEventListener("mouseenter", () => {
          gsap.to(item, { scale: 1.03, duration: 0.4, ease: "power2.out" });
          gsap.to(overlay, { opacity: 1, duration: 0.3 });
          gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3 });
          gsap.fromTo(heart, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, { scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(overlay, { opacity: 0, duration: 0.3 });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
          gsap.to(heart, { scale: 0, opacity: 0, duration: 0.2 });
        });
      });

      // Floating camera icon
      gsap.to(".floating-camera", {
        y: -8,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Layout pattern for masonry-like grid
  const galleryItems = [
    { id: 1, span: "col-span-2 row-span-2", label: "Foto Principal", aspect: "aspect-square" },
    { id: 2, span: "col-span-1 row-span-1", label: "Foto 2", aspect: "aspect-square" },
    { id: 3, span: "col-span-1 row-span-1", label: "Foto 3", aspect: "aspect-square" },
    { id: 4, span: "col-span-1 row-span-2", label: "Foto 4", aspect: "aspect-[3/4]" },
    { id: 5, span: "col-span-1 row-span-1", label: "Foto 5", aspect: "aspect-square" },
    { id: 6, span: "col-span-2 row-span-1", label: "Foto 6", aspect: "aspect-[2/1]" },
  ];

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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title section */}
        <div className="text-center mb-16">
          <div className="floating-camera w-20 h-20 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] flex items-center justify-center text-[#c9a959] mx-auto mb-8 shadow-xl border border-white/10">
            <Camera className="w-10 h-10" />
          </div>

          <div className="gallery-title overflow-hidden">
            <h2 className="font-serif text-4xl md:text-6xl text-white">
              <span className="gallery-title-word inline-block">Nuestra</span>{" "}
              <span className="gallery-title-word inline-block">Galeria</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
            <AnimatedHeart className="w-5 h-5 text-[#c9a959]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
          </div>

          <p className="text-white/60 font-sans mt-6 text-lg max-w-xl mx-auto">
            Momentos especiales de nuestra historia juntos
          </p>
        </div>

        {/* Photo grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item ${item.span} relative bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center group cursor-pointer shadow-lg`}
            >
              {/* Placeholder content */}
              <div className="text-center p-4 relative z-10">
                <div className="gallery-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 shadow-md backdrop-blur-sm">
                  <Camera className="w-6 h-6 text-white/40" />
                </div>
                <span className="text-white/40 font-sans text-sm">
                  {item.label}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/50 to-transparent opacity-0 flex flex-col items-center justify-end p-6">
                <Heart className="gallery-heart w-8 h-8 text-[#c9a959] mb-3" />
                <p className="text-white font-sans text-sm text-center">
                  {item.label}
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#c9a959]/0 group-hover:border-[#c9a959]/50 rounded-tl-lg transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#c9a959]/0 group-hover:border-[#c9a959]/50 rounded-br-lg transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Instagram hashtag */}
        <div className="mt-12 text-center">
          <p className="text-white/40 font-sans text-sm mb-2">
            Comparte tus fotos con nosotros usando
          </p>
          <span className="inline-block px-6 py-3 bg-white/5 rounded-full font-sans text-[#c9a959] font-medium border border-[#c9a959]/20">
            #MariaYCarlos2026
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".gallery-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gallery-item",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Layout pattern for masonry-like grid
  const galleryItems = [
    { id: 1, span: "col-span-2 row-span-2", label: "Foto Principal" },
    { id: 2, span: "col-span-1 row-span-1", label: "Foto 2" },
    { id: 3, span: "col-span-1 row-span-1", label: "Foto 3" },
    { id: 4, span: "col-span-1 row-span-2", label: "Foto 4" },
    { id: 5, span: "col-span-1 row-span-1", label: "Foto 5" },
    { id: 6, span: "col-span-2 row-span-1", label: "Foto 6" },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-full bg-[#0a1628] flex items-center justify-center text-white mx-auto mb-8">
            <Camera className="w-10 h-10" />
          </div>
          <h2 className="gallery-title font-serif text-4xl md:text-5xl text-[#0a1628] mb-4">
            Nuestra Galeria
          </h2>
          <p className="text-[#0a1628]/60 font-sans max-w-xl mx-auto">
            Momentos especiales de nuestra historia juntos
          </p>
        </div>

        {/* Photo grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[180px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item ${item.span} bg-[#f0f4f8] rounded-xl overflow-hidden border-2 border-dashed border-[#0a1628]/20 flex items-center justify-center group cursor-pointer hover:border-[#c9a959] transition-colors`}
            >
              <div className="text-center p-4">
                <Camera className="w-8 h-8 text-[#0a1628]/30 mx-auto mb-2 group-hover:text-[#c9a959] transition-colors" />
                <span className="text-[#0a1628]/40 font-sans text-sm group-hover:text-[#0a1628]/60 transition-colors">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#0a1628]/40 font-sans text-sm mt-8">
          Sube tus fotos favoritas para personalizar esta galeria
        </p>
      </div>
    </section>
  );
}

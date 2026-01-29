"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shirt } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function DressCode() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dresscode-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".dresscode-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".color-swatch",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".color-swatches",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        <div className="dresscode-content text-center">
          <div className="w-20 h-20 rounded-full bg-[#0a1628] flex items-center justify-center text-white mx-auto mb-8">
            <Shirt className="w-10 h-10" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-[#0a1628] mb-4">
            Codigo de Vestimenta
          </h2>
          <p className="text-[#0a1628]/60 font-sans mb-8 max-w-xl mx-auto">
            Te pedimos vestir de manera formal siguiendo nuestra paleta de colores
          </p>

          <div className="inline-block bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#0a1628]/5">
            <h3 className="font-serif text-2xl text-[#0a1628] mb-6">
              Formal / Etiqueta
            </h3>

            <div className="color-swatches flex items-center justify-center gap-4 mb-8">
              <div className="color-swatch flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a1628] shadow-lg border-4 border-white" />
                <span className="text-xs font-sans text-[#0a1628]/60">Azul Marino</span>
              </div>
              <div className="color-swatch flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg border-4 border-[#0a1628]/10" />
                <span className="text-xs font-sans text-[#0a1628]/60">Blanco</span>
              </div>
              <div className="color-swatch flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#c9a959] shadow-lg border-4 border-white" />
                <span className="text-xs font-sans text-[#0a1628]/60">Dorado</span>
              </div>
            </div>

            <div className="space-y-3 text-left max-w-md mx-auto">
              <p className="text-[#0a1628]/70 font-sans text-sm flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#c9a959]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#c9a959]" />
                </span>
                <span><strong>Damas:</strong> Vestido largo o coctel en tonos azul marino, blanco, plateado o dorado</span>
              </p>
              <p className="text-[#0a1628]/70 font-sans text-sm flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#c9a959]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#c9a959]" />
                </span>
                <span><strong>Caballeros:</strong> Traje formal en tonos oscuros, preferentemente azul marino</span>
              </p>
              <p className="text-[#0a1628]/70 font-sans text-sm flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#c9a959]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#c9a959]" />
                </span>
                <span><strong>Nota:</strong> Por favor evitar el color blanco en vestidos largos (reservado para la novia)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

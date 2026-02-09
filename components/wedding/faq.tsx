"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle, Baby, Car, UtensilsCrossed, Camera, Music, Bus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    icon: Baby,
    question: "Es una boda sin ninos?",
    answer:
      "Queremos que disfrutes de la celebracion sin preocupaciones. Por esta razon, hemos decidido que sea una celebracion solo para adultos. Esperamos contar con tu comprension.",
    color: "#e8a87c",
  },
  {
    icon: Car,
    question: "Hay estacionamiento disponible?",
    answer:
      "Si, el salon de eventos cuenta con amplio estacionamiento gratuito para todos los invitados. Tambien habra servicio de valet parking.",
    color: "#85cdca",
  },
  {
    icon: UtensilsCrossed,
    question: "Habra opciones de comida para dietas especiales?",
    answer:
      "Si tienes alguna restriccion alimenticia o alergia, por favor indicalo en el formulario de confirmacion y nos aseguraremos de tener opciones para ti.",
    color: "#c38d9e",
  },
  {
    icon: Camera,
    question: "Puedo tomar fotos durante la ceremonia?",
    answer:
      "Durante la ceremonia religiosa te pedimos que no uses el celular para que todos podamos vivir el momento. En la recepcion puedes tomar todas las fotos que quieras!",
    color: "#41b3a3",
  },
  {
    icon: Music,
    question: "Puedo sugerir canciones para la fiesta?",
    answer:
      "Claro que si! Nos encantaria saber que canciones te ponen a bailar. Dejanos tus sugerencias en el formulario de confirmacion.",
    color: "#c9a959",
  },
  {
    icon: Bus,
    question: "Habra transporte desde/hacia el evento?",
    answer:
      "Si vienes de fuera de la ciudad, podemos ayudarte a coordinar transporte. Contactanos directamente para mas informacion.",
    color: "#8d8741",
  },
];

export function FAQ({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".faq-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".faq-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Accordion items stagger
      gsap.fromTo(
        ".faq-item",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".faq-accordion",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating question mark
      gsap.to(".floating-question", {
        y: -8,
        rotation: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Icon pulse animation
      gsap.utils.toArray(".faq-icon").forEach((icon: any) => {
        gsap.to(icon, {
          scale: 1.1,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={sectionRef} className="relative min-h-screen lg:h-[100dvh] flex flex-col justify-center py-10 md:py-20 px-6 bg-[#f8fafc] overflow-hidden snap-start">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0a1628 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 w-full lg:h-full lg:overflow-y-auto lg:hide-scrollbar">
        {/* Title section */}
        <div className="text-center mb-16">
          <div className="floating-question w-24 h-24 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
            <HelpCircle className="w-12 h-12" />
          </div>

          <div className="faq-title overflow-hidden">
            <h2 className="font-serif text-4xl md:text-6xl text-[#0a1628]">
              <span className="faq-title-word inline-block">Preguntas</span>{" "}
              <span className="faq-title-word inline-block">Frecuentes</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
            <div className="w-2 h-2 rounded-full bg-[#c9a959]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
          </div>

          <p className="text-[#0a1628]/60 font-sans mt-6 text-lg">
            Aqui resolvemos tus dudas mas comunes
          </p>
        </div>

        <div className="faq-accordion">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="faq-item bg-white rounded-2xl border border-[#0a1628]/5 px-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-6 group">
                    <div className="flex items-center gap-4 text-left">
                      <div
                        className="faq-icon w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <span className="font-sans font-medium text-[#0a1628] text-lg group-hover:text-[#0a1628]/80 transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-16">
                    <p className="text-[#0a1628]/70 font-sans leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Bottom help text */}
        <div className="mt-12 text-center">
          <p className="text-[#0a1628]/40 font-sans text-sm">
            Tienes mas preguntas? Contactanos directamente
          </p>
        </div>
      </div>
    </section>
  );
}

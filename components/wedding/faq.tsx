"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle, Baby, Car, UtensilsCrossed, Camera, Music } from "lucide-react";
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
  },
  {
    icon: Car,
    question: "Hay estacionamiento disponible?",
    answer:
      "Si, el salon de eventos cuenta con amplio estacionamiento gratuito para todos los invitados. Tambien habra servicio de valet parking.",
  },
  {
    icon: UtensilsCrossed,
    question: "Habra opciones de comida para dietas especiales?",
    answer:
      "Si tienes alguna restriccion alimenticia o alergia, por favor indicalo en el formulario de confirmacion y nos aseguraremos de tener opciones para ti.",
  },
  {
    icon: Camera,
    question: "Puedo tomar fotos durante la ceremonia?",
    answer:
      "Durante la ceremonia religiosa te pedimos que no uses el celular para que todos podamos vivir el momento. En la recepcion puedes tomar todas las fotos que quieras!",
  },
  {
    icon: Music,
    question: "Puedo sugerir canciones para la fiesta?",
    answer:
      "Claro que si! Nos encantaria saber que canciones te ponen a bailar. Dejanos tus sugerencias en el formulario de confirmacion.",
  },
  {
    icon: Car,
    question: "Habra transporte desde/hacia el evento?",
    answer:
      "Si vienes de fuera de la ciudad, podemos ayudarte a coordinar transporte. Contactanos directamente para mas informacion.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".faq-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".faq-accordion",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".faq-accordion",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-full bg-[#0a1628] flex items-center justify-center text-white mx-auto mb-8">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h2 className="faq-title font-serif text-4xl md:text-5xl text-[#0a1628] mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-[#0a1628]/60 font-sans">
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
                  className="bg-white rounded-xl border border-[#0a1628]/5 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-full bg-[#0a1628]/5 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#0a1628]" />
                      </div>
                      <span className="font-sans font-medium text-[#0a1628]">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-14">
                    <p className="text-[#0a1628]/70 font-sans leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

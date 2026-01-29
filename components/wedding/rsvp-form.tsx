"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CheckCircle2, Calendar, Clock, Users } from "lucide-react";
import { AnimatedHeart, AnimatedCalendar } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

export function RSVPForm({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".rsvp-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".rsvp-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        ".info-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".info-cards",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form entrance
      gsap.fromTo(
        formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form fields stagger
      gsap.fromTo(
        ".form-field",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating icon
      gsap.to(".floating-rsvp-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Info card hover effects
      gsap.utils.toArray(".info-card").forEach((card: any) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -5, scale: 1.02, duration: 0.3 });
          gsap.to(card.querySelector(".info-icon"), { scale: 1.2, rotation: 10, duration: 0.3 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3 });
          gsap.to(card.querySelector(".info-icon"), { scale: 1, rotation: 0, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button loading animation
    gsap.to(".submit-btn", { scale: 0.95, duration: 0.1 });

    // Simulating form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Gracias por confirmar tu asistencia");

    // Success animation
    gsap.fromTo(
      ".success-message",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Confetti-like particles
    gsap.fromTo(
      ".success-particle",
      { scale: 0, opacity: 1, y: 0 },
      {
        scale: 1,
        opacity: 0,
        y: -100,
        x: "random(-100, 100)",
        rotation: "random(-180, 180)",
        duration: 1.5,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative flex flex-col justify-center py-6 md:py-16 px-4 md:px-6 bg-[#0a1628] overflow-hidden snap-start"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title section */}
        <div className="text-center mb-12">
          <div className="floating-rsvp-icon w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a959]/30 to-[#c9a959]/10 flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/10">
            <AnimatedCalendar className="w-12 h-12" />
          </div>

          <div className="rsvp-title overflow-hidden">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
              <span className="rsvp-title-word inline-block">Confirma</span>{" "}
              <span className="rsvp-title-word inline-block">tu</span>{" "}
              <span className="rsvp-title-word inline-block">Asistencia</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
            <AnimatedHeart className="w-5 h-5 text-[#c9a959]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
          </div>

          <p className="text-white/60 font-sans mt-6 mb-2 text-lg">
            Por favor confirma tu asistencia antes del
          </p>
          <p className="text-[#c9a959] font-serif text-2xl">1 de Mayo, 2026</p>
        </div>

        {/* Quick info cards */}
        <div className="info-cards grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="info-card bg-white/5 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 border border-white/10 cursor-default">
            <div className="info-icon w-12 h-12 rounded-xl bg-[#c9a959]/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#c9a959]" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-sans tracking-wide uppercase">Fecha</p>
              <p className="text-white font-sans font-medium">15 de Junio, 2026</p>
            </div>
          </div>
          <div className="info-card bg-white/5 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 border border-white/10 cursor-default">
            <div className="info-icon w-12 h-12 rounded-xl bg-[#c9a959]/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#c9a959]" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-sans tracking-wide uppercase">Hora</p>
              <p className="text-white font-sans font-medium">16:00 hrs</p>
            </div>
          </div>
          <div className="info-card bg-white/5 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 border border-white/10 cursor-default">
            <div className="info-icon w-12 h-12 rounded-xl bg-[#c9a959]/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#c9a959]" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-sans tracking-wide uppercase">Evento</p>
              <p className="text-white font-sans font-medium">Solo adultos</p>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#c9a959]/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#c9a959]/20 rounded-bl-3xl" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field space-y-2">
                <Label htmlFor="name" className="text-white font-sans font-medium">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre completo"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a959] focus:ring-[#c9a959] rounded-xl py-6"
                />
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor="email" className="text-white font-sans font-medium">
                  Correo Electronico *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a959] focus:ring-[#c9a959] rounded-xl py-6"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field space-y-2">
                <Label htmlFor="phone" className="text-white font-sans font-medium">
                  Telefono / WhatsApp
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+52 123 456 7890"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a959] focus:ring-[#c9a959] rounded-xl py-6"
                />
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor="guests" className="text-white font-sans font-medium">
                  Numero de Invitados *
                </Label>
                <Select name="guests" required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl py-6">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1628] border-white/10 text-white">
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="3">3 personas</SelectItem>
                    <SelectItem value="4">4 personas</SelectItem>
                    <SelectItem value="5">5+ personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="form-field space-y-3">
              <Label className="text-white font-sans font-medium">
                Asistiras al evento? *
              </Label>
              <RadioGroup
                defaultValue="yes"
                name="attendance"
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded-xl border border-transparent hover:border-[#c9a959]/30 transition-colors">
                  <RadioGroupItem value="yes" id="yes" className="border-white text-[#c9a959]" />
                  <Label htmlFor="yes" className="font-normal cursor-pointer text-white">
                    Si, ahi estare
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded-xl border border-transparent hover:border-[#c9a959]/30 transition-colors">
                  <RadioGroupItem value="maybe" id="maybe" className="border-white text-[#c9a959]" />
                  <Label htmlFor="maybe" className="font-normal cursor-pointer text-white">
                    Aun no estoy seguro
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-3 rounded-xl border border-transparent hover:border-[#c9a959]/30 transition-colors">
                  <RadioGroupItem value="no" id="no" className="border-white text-[#c9a959]" />
                  <Label htmlFor="no" className="font-normal cursor-pointer text-white">
                    No podre asistir
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field space-y-2">
                <Label htmlFor="dietary" className="text-white font-sans font-medium">
                  Restricciones Alimenticias
                </Label>
                <Select name="dietary">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl py-6">
                    <SelectValue placeholder="Selecciona si aplica" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1628] border-white/10 text-white">
                    <SelectItem value="none">Ninguna</SelectItem>
                    <SelectItem value="vegetarian">Vegetariano</SelectItem>
                    <SelectItem value="vegan">Vegano</SelectItem>
                    <SelectItem value="gluten-free">Sin Gluten</SelectItem>
                    <SelectItem value="lactose-free">Sin Lactosa</SelectItem>
                    <SelectItem value="other">Otra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor="transport" className="text-white font-sans font-medium">
                  Necesitas transporte?
                </Label>
                <Select name="transport">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl py-6">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1628] border-white/10 text-white">
                    <SelectItem value="no">No, llegare por mi cuenta</SelectItem>
                    <SelectItem value="yes">Si, necesito transporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="form-field space-y-2">
              <Label htmlFor="songs" className="text-white font-sans font-medium">
                Sugerencias de Canciones
              </Label>
              <Input
                id="songs"
                name="songs"
                placeholder="Que canciones te ponen a bailar?"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a959] focus:ring-[#c9a959] rounded-xl py-6"
              />
            </div>

            <div className="form-field space-y-2">
              <Label htmlFor="message" className="text-white font-sans font-medium">
                Mensaje para los Novios (Opcional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Escribe un mensaje especial para los novios..."
                rows={4}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a959] focus:ring-[#c9a959] resize-none rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn w-full bg-[#c9a959] hover:bg-[#b8963d] text-[#0a1628] font-bold font-sans tracking-wide py-7 text-lg rounded-xl transition-all duration-500 hover:shadow-xl hover:shadow-[#c9a959]/20"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Confirmar Asistencia"
              )}
            </Button>
          </form>
        ) : (
          <div className="success-message relative bg-white/5 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl text-center overflow-hidden border border-white/10">
            {/* Success particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="success-particle absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
                style={{ backgroundColor: i % 2 === 0 ? "#c9a959" : "white" }}
              />
            ))}

            <div className="w-28 h-28 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle2 className="w-14 h-14 text-green-400" />
            </div>
            <h3 className="font-serif text-4xl text-white mb-4">
              Gracias por Confirmar
            </h3>
            <p className="text-white/60 font-sans max-w-md mx-auto text-lg leading-relaxed">
              Hemos recibido tu confirmacion. Estamos muy emocionados de
              celebrar este dia tan especial contigo. Te enviaremos un
              recordatorio antes del evento.
            </p>

            <div className="mt-8">
              <AnimatedHeart className="w-8 h-8 mx-auto text-[#c9a959]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

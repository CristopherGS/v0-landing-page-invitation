"use client";

import React from "react"

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
import { CheckCircle2, Mail, Calendar, Clock, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function RSVPForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rsvp-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".rsvp-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Gracias por confirmar tu asistencia");

    // Animate success state
    gsap.fromTo(
      ".success-message",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="py-20 md:py-28 px-6 bg-[#0a1628]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#c9a959]/20 flex items-center justify-center text-[#c9a959] mx-auto mb-8">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="rsvp-title font-serif text-4xl md:text-5xl text-white mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-white/60 font-sans mb-2">
            Por favor confirma tu asistencia antes del
          </p>
          <p className="text-[#c9a959] font-serif text-xl">1 de Mayo, 2026</p>
        </div>

        {/* Quick info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-white/10">
            <Calendar className="w-8 h-8 text-[#c9a959]" />
            <div>
              <p className="text-white/50 text-xs font-sans">Fecha</p>
              <p className="text-white font-sans">15 de Junio, 2026</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-white/10">
            <Clock className="w-8 h-8 text-[#c9a959]" />
            <div>
              <p className="text-white/50 text-xs font-sans">Hora</p>
              <p className="text-white font-sans">16:00 hrs</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-white/10">
            <Users className="w-8 h-8 text-[#c9a959]" />
            <div>
              <p className="text-white/50 text-xs font-sans">Evento</p>
              <p className="text-white font-sans">Solo adultos</p>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#0a1628] font-sans">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre completo"
                  className="border-[#0a1628]/20 focus:border-[#0a1628] focus:ring-[#0a1628]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0a1628] font-sans">
                  Correo Electronico *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="border-[#0a1628]/20 focus:border-[#0a1628] focus:ring-[#0a1628]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#0a1628] font-sans">
                  Telefono / WhatsApp
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+52 123 456 7890"
                  className="border-[#0a1628]/20 focus:border-[#0a1628] focus:ring-[#0a1628]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-[#0a1628] font-sans">
                  Numero de Invitados *
                </Label>
                <Select name="guests" required>
                  <SelectTrigger className="border-[#0a1628]/20">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="3">3 personas</SelectItem>
                    <SelectItem value="4">4 personas</SelectItem>
                    <SelectItem value="5">5+ personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[#0a1628] font-sans">
                Asistiras al evento? *
              </Label>
              <RadioGroup
                defaultValue="yes"
                name="attendance"
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal cursor-pointer text-[#0a1628]">
                    Si, ahi estare
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="maybe" />
                  <Label htmlFor="maybe" className="font-normal cursor-pointer text-[#0a1628]">
                    Aun no estoy seguro
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal cursor-pointer text-[#0a1628]">
                    No podre asistir
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-[#0a1628] font-sans">
                  Restricciones Alimenticias
                </Label>
                <Select name="dietary">
                  <SelectTrigger className="border-[#0a1628]/20">
                    <SelectValue placeholder="Selecciona si aplica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ninguna</SelectItem>
                    <SelectItem value="vegetarian">Vegetariano</SelectItem>
                    <SelectItem value="vegan">Vegano</SelectItem>
                    <SelectItem value="gluten-free">Sin Gluten</SelectItem>
                    <SelectItem value="lactose-free">Sin Lactosa</SelectItem>
                    <SelectItem value="other">Otra (especificar abajo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transport" className="text-[#0a1628] font-sans">
                  Necesitas transporte?
                </Label>
                <Select name="transport">
                  <SelectTrigger className="border-[#0a1628]/20">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No, llegare por mi cuenta</SelectItem>
                    <SelectItem value="yes">Si, necesito transporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="songs" className="text-[#0a1628] font-sans">
                Sugerencias de Canciones
              </Label>
              <Input
                id="songs"
                name="songs"
                placeholder="Que canciones te ponen a bailar?"
                className="border-[#0a1628]/20 focus:border-[#0a1628] focus:ring-[#0a1628]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#0a1628] font-sans">
                Mensaje para los Novios (Opcional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Escribe un mensaje especial para los novios..."
                rows={4}
                className="border-[#0a1628]/20 focus:border-[#0a1628] focus:ring-[#0a1628] resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0a1628] hover:bg-[#1e3a5f] text-white font-sans tracking-wide py-6 text-base transition-all duration-300"
            >
              {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
            </Button>
          </form>
        ) : (
          <div className="success-message bg-white rounded-2xl p-12 shadow-2xl text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="font-serif text-3xl text-[#0a1628] mb-4">
              Gracias por Confirmar
            </h3>
            <p className="text-[#0a1628]/60 font-sans max-w-md mx-auto">
              Hemos recibido tu confirmacion. Estamos muy emocionados de
              celebrar este dia tan especial contigo. Te enviaremos un
              recordatorio antes del evento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

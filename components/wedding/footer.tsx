"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { AnimatedHeart, AnimatedRings } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(
        ".footer-element",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Names reveal
      gsap.fromTo(
        ".footer-name-char",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          scrollTrigger: {
            trigger: ".footer-names",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Contact cards hover
      gsap.utils.toArray(".contact-card").forEach((card: any) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -5, scale: 1.02, duration: 0.3 });
          gsap.to(card.querySelector(".contact-icon"), { scale: 1.2, rotation: 10, duration: 0.3 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3 });
          gsap.to(card.querySelector(".contact-icon"), { scale: 1, rotation: 0, duration: 0.3 });
        });
      });

      // Social button pulse
      gsap.to(".social-btn", {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating rings animation
      gsap.to(".footer-rings", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "linear",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const names = "Maria & Carlos";

  return (
    <footer ref={footerRef} className="relative py-20 px-6 bg-[#0a1628] text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="footer-rings">
          <AnimatedRings className="w-32 h-20" color="white" />
        </div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <div className="footer-rings" style={{ animationDirection: "reverse" }}>
          <AnimatedRings className="w-32 h-20" color="white" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Ornament */}
        <div className="footer-element flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9a959]/40" />
          <AnimatedHeart className="w-10 h-10" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9a959]/40" />
        </div>

        {/* Names with character animation */}
        <div className="footer-names text-center mb-4">
          <h3 className="font-serif text-5xl md:text-6xl">
            {names.split("").map((char, i) => (
              <span
                key={i}
                className="footer-name-char inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h3>
        </div>
        
        <p className="footer-element font-sans text-white/60 text-center tracking-widest mb-12 text-lg">
          15 de Junio, 2026
        </p>

        {/* Contact info */}
        <div className="footer-element grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <a
            href="tel:+521234567890"
            className="contact-card flex items-center justify-center gap-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all group border border-white/5"
          >
            <div className="contact-icon w-10 h-10 rounded-xl bg-[#c9a959]/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#c9a959]" />
            </div>
            <span className="font-sans text-sm text-white/70 group-hover:text-white">
              +52 123 456 7890
            </span>
          </a>
          <a
            href="mailto:boda@mariaycarlos.com"
            className="contact-card flex items-center justify-center gap-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all group border border-white/5"
          >
            <div className="contact-icon w-10 h-10 rounded-xl bg-[#c9a959]/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#c9a959]" />
            </div>
            <span className="font-sans text-sm text-white/70 group-hover:text-white">
              boda@mariaycarlos.com
            </span>
          </a>
          <a
            href="https://wa.me/521234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card flex items-center justify-center gap-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all group border border-white/5"
          >
            <div className="contact-icon w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-400" />
            </div>
            <span className="font-sans text-sm text-white/70 group-hover:text-white">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Social links */}
        <div className="footer-element flex items-center justify-center gap-4 mb-12">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Hashtag */}
        <div className="footer-element text-center mb-12">
          <p className="text-white/40 font-sans text-sm mb-3">
            Comparte tus fotos con
          </p>
          <span className="inline-block px-8 py-4 bg-white/5 rounded-full font-serif text-2xl text-[#c9a959] border border-[#c9a959]/20">
            #MariaYCarlos2026
          </span>
        </div>

        {/* Bottom */}
        <div className="footer-element pt-10 border-t border-white/10 text-center">
          <p className="font-sans text-sm text-white/50 mb-2">
            Con amor, esperamos verte en nuestro dia especial
          </p>
          <div className="flex items-center justify-center gap-2 text-white/30">
            <span className="text-xs font-sans">Hecho con</span>
            <AnimatedHeart className="w-4 h-4" color="#c9a959" />
            <span className="text-xs font-sans">para nuestra boda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

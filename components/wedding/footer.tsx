"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Instagram, Mail, Phone, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".heart-icon", {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-16 px-6 bg-[#0a1628] text-white">
      <div className="footer-content max-w-4xl mx-auto">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-20 bg-[#c9a959]/40" />
          <Heart className="heart-icon w-8 h-8 text-[#c9a959] fill-[#c9a959]" />
          <div className="h-px w-20 bg-[#c9a959]/40" />
        </div>

        {/* Names */}
        <h3 className="font-serif text-4xl md:text-5xl text-center mb-4">
          Maria & Carlos
        </h3>
        <p className="font-sans text-white/60 text-center tracking-wide mb-12">
          15 de Junio, 2026
        </p>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="tel:+521234567890"
            className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
          >
            <Phone className="w-5 h-5 text-[#c9a959]" />
            <span className="font-sans text-sm text-white/70 group-hover:text-white">
              +52 123 456 7890
            </span>
          </a>
          <a
            href="mailto:boda@mariaycarlos.com"
            className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
          >
            <Mail className="w-5 h-5 text-[#c9a959]" />
            <span className="font-sans text-sm text-white/70 group-hover:text-white">
              boda@mariaycarlos.com
            </span>
          </a>
          <a
            href="https://wa.me/521234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
          >
            <MessageCircle className="w-5 h-5 text-[#c9a959]" />
            <span className="font-sans text-sm text-white/70 group-hover:text-white">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#c9a959] hover:text-white transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Hashtag */}
        <div className="text-center mb-12">
          <p className="text-white/40 font-sans text-sm mb-2">
            Comparte tus fotos con
          </p>
          <p className="text-[#c9a959] font-serif text-2xl">#MariaYCarlos2026</p>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="font-sans text-sm text-white/40">
            Con amor, esperamos verte en nuestro dia especial
          </p>
          <p className="font-sans text-xs text-white/30 mt-4">
            Hecho con amor para nuestra boda
          </p>
        </div>
      </div>
    </footer>
  );
}

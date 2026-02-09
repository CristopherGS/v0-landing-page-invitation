"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CreditCard, Copy, Check, ExternalLink, Banknote } from "lucide-react";
import { toast } from "sonner";
import { AnimatedGift } from "./animated-icons";

gsap.registerPlugin(ScrollTrigger);

export function GiftRegistry({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanupFns: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".gift-title-word",
        { y: 80, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".gift-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards entrance with stagger
      gsap.fromTo(
        ".gift-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".gift-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bank info items reveal
      gsap.fromTo(
        ".bank-info-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".bank-info",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Store links reveal
      gsap.fromTo(
        ".store-link",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".store-links",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover effects for cards
      if (canHover) {
        gsap.utils.toArray<HTMLElement>(".gift-card").forEach((card) => {
          const onEnter = () => {
            gsap.to(card, { y: -10, scale: 1.02, duration: 0.3 });
            gsap.to(card.querySelector(".card-glow"), { opacity: 1, duration: 0.3 });
          };
          const onLeave = () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.3 });
            gsap.to(card.querySelector(".card-glow"), { opacity: 0, duration: 0.3 });
          };
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          cleanupFns.push(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      // Floating icon animation
      gsap.to(".floating-gift", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copiado al portapapeles");

    // Animate copy button
    gsap.fromTo(
      `.copy-btn-${field}`,
      { scale: 0.8 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" }
    );

    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankDetails = {
    bank: "Nombre del Banco",
    accountHolder: "Nombre del Titular",
    accountNumber: "0000 0000 0000 0000",
    clabe: "000000000000000000",
  };

  return (
    <section id={id} ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-20 px-6 bg-[#0a1628] overflow-hidden snap-start">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title section */}
        <div className="text-center mb-16">
          <div className="floating-gift w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a959]/30 to-[#c9a959]/10 flex items-center justify-center mx-auto mb-8 shadow-xl">
            <AnimatedGift className="w-12 h-12" />
          </div>

          <div className="gift-title overflow-hidden">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
              <span className="gift-title-word inline-block">Mesa</span>{" "}
              <span className="gift-title-word inline-block">de</span>{" "}
              <span className="gift-title-word inline-block">Regalos</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a959]/50" />
            <div className="w-2 h-2 rounded-full bg-[#c9a959]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a959]/50" />
          </div>

          <p className="text-white/60 font-sans mt-6 text-lg max-w-xl mx-auto">
            Tu presencia es nuestro mejor regalo. Sin embargo, si deseas obsequiarnos algo,
            aqui te dejamos algunas opciones.
          </p>
        </div>

        <div className="gift-cards grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank transfer card */}
          <div className="gift-card relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 overflow-hidden">
            {/* Glow effect */}
            <div className="card-glow absolute inset-0 bg-gradient-to-t from-[#c9a959]/10 to-transparent opacity-0" />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#c9a959]/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#c9a959]/20 rounded-bl-3xl" />

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a959]/30 to-[#c9a959]/10 flex items-center justify-center shadow-lg">
                <Banknote className="w-7 h-7 text-[#c9a959]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">Transferencia Bancaria</h3>
                <p className="text-white/50 text-sm font-sans">{bankDetails.bank}</p>
              </div>
            </div>

            <div className="bank-info space-y-4 relative z-10">
              <div className="bank-info-item bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-white/40 text-xs font-sans mb-1 tracking-wide uppercase">Titular</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-sans">{bankDetails.accountHolder}</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountHolder, "holder")}
                    className={`copy-btn-holder w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-[#c9a959] hover:bg-white/20 transition-all`}
                  >
                    {copiedField === "holder" ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bank-info-item bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-white/40 text-xs font-sans mb-1 tracking-wide uppercase">Numero de Cuenta</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-mono text-lg tracking-wider">{bankDetails.accountNumber}</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber.replace(/\s/g, ""), "account")}
                    className={`copy-btn-account w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-[#c9a959] hover:bg-white/20 transition-all`}
                  >
                    {copiedField === "account" ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bank-info-item bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-white/40 text-xs font-sans mb-1 tracking-wide uppercase">CLABE Interbancaria</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-mono tracking-wider">{bankDetails.clabe}</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.clabe, "clabe")}
                    className={`copy-btn-clabe w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-[#c9a959] hover:bg-white/20 transition-all`}
                  >
                    {copiedField === "clabe" ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gift registry links */}
          <div className="gift-card relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 overflow-hidden">
            {/* Glow effect */}
            <div className="card-glow absolute inset-0 bg-gradient-to-t from-[#c9a959]/10 to-transparent opacity-0" />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#c9a959]/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#c9a959]/20 rounded-bl-3xl" />

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a959]/30 to-[#c9a959]/10 flex items-center justify-center shadow-lg">
                <CreditCard className="w-7 h-7 text-[#c9a959]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">Mesas de Regalos</h3>
                <p className="text-white/50 text-sm font-sans">Tiendas en linea</p>
              </div>
            </div>

            <div className="store-links space-y-4 relative z-10">
              {[
                { name: "Tienda 1", desc: "Próximamente" },
                { name: "Tienda 2", desc: "Próximamente" },
                { name: "Efectivo", desc: "Sobre el día del evento" },
              ].map((store, index) => (
                <a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-link block bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all group border border-white/5 hover:border-[#c9a959]/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-sans font-medium group-hover:text-[#c9a959] transition-colors">
                        {store.name}
                      </p>
                      <p className="text-white/40 text-sm font-sans">{store.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#c9a959]/20 transition-all">
                      <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-[#c9a959] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

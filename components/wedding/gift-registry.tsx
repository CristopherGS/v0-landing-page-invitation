"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gift, CreditCard, Copy, Check, ExternalLink, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

export function GiftRegistry() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gift-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".gift-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gift-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".gift-cards",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankDetails = {
    bank: "Banco Nacional",
    accountHolder: "Maria Rodriguez / Carlos Martinez",
    accountNumber: "1234 5678 9012 3456",
    clabe: "012345678901234567",
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-[#0a1628]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-full bg-[#c9a959]/20 flex items-center justify-center text-[#c9a959] mx-auto mb-8">
            <Gift className="w-10 h-10" />
          </div>
          <h2 className="gift-title font-serif text-4xl md:text-5xl text-white mb-4">
            Mesa de Regalos
          </h2>
          <p className="text-white/60 font-sans max-w-xl mx-auto">
            Tu presencia es nuestro mejor regalo. Sin embargo, si deseas obsequiarnos algo,
            aqui te dejamos algunas opciones.
          </p>
        </div>

        <div className="gift-cards grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank transfer card */}
          <div className="gift-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#c9a959]/20 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-[#c9a959]" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-white">Transferencia Bancaria</h3>
                <p className="text-white/50 text-sm font-sans">{bankDetails.bank}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/50 text-xs font-sans mb-1">Titular</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-sans text-sm">{bankDetails.accountHolder}</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountHolder, "holder")}
                    className="text-white/50 hover:text-[#c9a959] transition-colors"
                  >
                    {copiedField === "holder" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/50 text-xs font-sans mb-1">Numero de Cuenta</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-sans text-sm font-mono">{bankDetails.accountNumber}</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber.replace(/\s/g, ""), "account")}
                    className="text-white/50 hover:text-[#c9a959] transition-colors"
                  >
                    {copiedField === "account" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/50 text-xs font-sans mb-1">CLABE Interbancaria</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-sans text-sm font-mono">{bankDetails.clabe}</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.clabe, "clabe")}
                    className="text-white/50 hover:text-[#c9a959] transition-colors"
                  >
                    {copiedField === "clabe" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gift registry links */}
          <div className="gift-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#c9a959]/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#c9a959]" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-white">Mesas de Regalos</h3>
                <p className="text-white/50 text-sm font-sans">Tiendas en linea</p>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-sans">Liverpool</p>
                    <p className="text-white/50 text-sm font-sans">Mesa de Regalos #123456</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#c9a959] transition-colors" />
                </div>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-sans">Amazon</p>
                    <p className="text-white/50 text-sm font-sans">Lista de deseos</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#c9a959] transition-colors" />
                </div>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-sans">Palacio de Hierro</p>
                    <p className="text-white/50 text-sm font-sans">Mesa de Regalos #789012</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#c9a959] transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const ringLeftRef = useRef<HTMLDivElement>(null);
  const ringRightRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = false;
    const ctx = gsap.context(() => {
      gsap.set([ringLeftRef.current, ringRightRef.current], { opacity: 0 });
      gsap.set([namesRef.current, messageRef.current, continueRef.current], { opacity: 0, y: 16 });
      gsap.set(".ring-flash", { opacity: 0, scale: 0.2 });

      if (prefersReducedMotion) {
        setShowContinue(true);
        gsap.set([ringLeftRef.current, ringRightRef.current, namesRef.current, messageRef.current, continueRef.current], {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setShowContinue(true);
          gsap.to(continueRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
        },
      });

      tl.fromTo(
        ringLeftRef.current,
        { x: -120, rotation: -25, opacity: 0 },
        { x: -24, rotation: -8, opacity: 1, duration: 0.85 }
      )
        .fromTo(
          ringRightRef.current,
          { x: 120, rotation: 25, opacity: 0 },
          { x: 24, rotation: 8, opacity: 1, duration: 0.85 },
          "<"
        )
        .to([ringLeftRef.current, ringRightRef.current], {
          x: 0,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.8)",
        })
        .to(ringsRef.current, {
          scale: 1.12,
          duration: 0.24,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        })
        .to(".ring-flash", { opacity: 1, scale: 1, duration: 0.08 }, "-=0.2")
        .to(".ring-flash", { opacity: 0, duration: 0.35 })
        .to([namesRef.current, messageRef.current], { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.1");
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible]);

  const handleContinue = () => {
    window.dispatchEvent(new Event("wedding:preloader-continue"));

    const prefersReducedMotion = false;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a1628] text-white px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,89,0.18),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(201,169,89,0.12),transparent_45%)]" />

      <div ref={ringsRef} className="relative flex items-center justify-center">
        <div ref={ringLeftRef} className="absolute">
          <svg width="84" height="84" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="30" stroke="#c9a959" strokeWidth="4" />
            <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M20 20 Q40 10 60 20" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          </svg>
        </div>

        <div ref={ringRightRef} className="absolute">
          <svg width="84" height="84" viewBox="0 0 80 80" fill="none" style={{ transform: "rotate(180deg)" }}>
            <circle cx="40" cy="40" r="30" stroke="#c9a959" strokeWidth="4" />
            <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M20 20 Q40 10 60 20" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="ring-flash absolute w-1 h-1 bg-white shadow-[0_0_42px_22px_white] rounded-full" />
      </div>

      <div className="mt-24 text-center max-w-lg">
        <p ref={namesRef} className="font-serif text-2xl md:text-3xl text-[#c9a959] tracking-widest">
          Cristopher & Gabriela
        </p>
        <p ref={messageRef} className="mt-4 font-sans text-sm md:text-base text-white/70">
          Gracias por ser parte de este momento especial. Hemos preparado esta invitacion para ti.
        </p>
        <button
          ref={continueRef}
          onClick={handleContinue}
          className={`mt-8 rounded-full border border-[#c9a959]/40 px-7 py-3 text-sm font-medium tracking-wide text-[#f4e4bc] transition-colors hover:bg-[#c9a959]/15 ${showContinue ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          Toca para continuar
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Animated Heart Icon
export function AnimatedHeart({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const heartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heartRef.current, {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={heartRef} className={className} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Animated Rings Icon
export function AnimatedRings({ className = "w-16 h-16", color = "#c9a959" }: { className?: string; color?: string }) {
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ring1Ref.current, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        transformOrigin: "center center",
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 100 60" fill="none">
      <circle ref={ring1Ref} cx="35" cy="30" r="18" stroke={color} strokeWidth="3" strokeDasharray="8 4" />
      <circle ref={ring2Ref} cx="65" cy="30" r="18" stroke={color} strokeWidth="3" strokeDasharray="8 4" />
    </svg>
  );
}

// Animated Sparkles
export function AnimatedSparkles({ className = "w-20 h-20", color = "#c9a959" }: { className?: string; color?: string }) {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".sparkle", {
        scale: 0.5,
        opacity: 0.3,
        duration: 0.8,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        ease: "power1.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={containerRef} className={className} viewBox="0 0 100 100" fill={color}>
      <polygon className="sparkle" points="50,10 52,45 90,50 52,55 50,90 48,55 10,50 48,45" />
      <polygon className="sparkle" points="25,25 26,35 35,37 26,39 25,50 24,39 15,37 24,35" transform="scale(0.6) translate(10, 10)" />
      <polygon className="sparkle" points="75,15 76,25 85,27 76,29 75,40 74,29 65,27 74,25" transform="scale(0.5) translate(50, 5)" />
      <polygon className="sparkle" points="80,70 81,78 88,80 81,82 80,90 79,82 72,80 79,78" transform="scale(0.7)" />
    </svg>
  );
}

// Animated Dove/Bird
export function AnimatedDove({ className = "w-16 h-16", color = "#c9a959" }: { className?: string; color?: string }) {
  const wingRef = useRef<SVGPathElement>(null);
  const birdRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(wingRef.current, {
        rotation: -15,
        transformOrigin: "left center",
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(birdRef.current, {
        y: -3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 64 64" fill={color}>
      <g ref={birdRef}>
        <ellipse cx="32" cy="35" rx="12" ry="8" />
        <circle cx="42" cy="32" r="5" />
        <path ref={wingRef} d="M20 32 Q10 20 15 10 Q25 20 32 28" />
        <path d="M44 35 Q52 38 48 42" />
      </g>
    </svg>
  );
}

// Animated Flower/Rose
export function AnimatedFlower({ className = "w-16 h-16", color = "#c9a959" }: { className?: string; color?: string }) {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".petal", {
        scale: 1.1,
        duration: 2,
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
        ease: "power1.inOut",
        transformOrigin: "center center",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={containerRef} className={className} viewBox="0 0 100 100" fill={color}>
      <ellipse className="petal" cx="50" cy="30" rx="12" ry="20" />
      <ellipse className="petal" cx="70" cy="42" rx="12" ry="20" transform="rotate(72 50 50)" />
      <ellipse className="petal" cx="65" cy="68" rx="12" ry="20" transform="rotate(144 50 50)" />
      <ellipse className="petal" cx="35" cy="68" rx="12" ry="20" transform="rotate(216 50 50)" />
      <ellipse className="petal" cx="30" cy="42" rx="12" ry="20" transform="rotate(288 50 50)" />
      <circle cx="50" cy="50" r="10" fill={color} />
    </svg>
  );
}

// Animated Calendar
export function AnimatedCalendar({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const checkRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        checkRef.current,
        { strokeDashoffset: 20 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          repeat: -1,
          repeatDelay: 2,
          ease: "power2.out",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <path ref={checkRef} d="M8 15l2 2 5-5" strokeDasharray="20" />
    </svg>
  );
}

// Animated Clock
export function AnimatedClock({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const hourRef = useRef<SVGLineElement>(null);
  const minuteRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(minuteRef.current, {
        rotation: 360,
        transformOrigin: "12px 12px",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(hourRef.current, {
        rotation: 360,
        transformOrigin: "12px 12px",
        duration: 24,
        repeat: -1,
        ease: "linear",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line ref={hourRef} x1="12" y1="12" x2="12" y2="7" strokeWidth="2" />
      <line ref={minuteRef} x1="12" y1="12" x2="12" y2="5" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

// Animated Location Pin
export function AnimatedPin({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const pinRef = useRef<SVGGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(pinRef.current, {
        y: -3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(pulseRef.current, {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power1.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 24 28" fill={color}>
      <circle ref={pulseRef} cx="12" cy="22" r="3" fill={color} opacity="0.3" />
      <g ref={pinRef}>
        <path d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9zm0 12.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      </g>
    </svg>
  );
}

// Animated Gift Box
export function AnimatedGift({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const lidRef = useRef<SVGGElement>(null);
  const starRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      tl.to(lidRef.current, {
        y: -5,
        rotation: -10,
        transformOrigin: "center bottom",
        duration: 0.3,
        ease: "power2.out",
      })
        .to(starRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        })
        .to(starRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
        })
        .to(lidRef.current, {
          y: 0,
          rotation: 0,
          duration: 0.2,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <polygon
        ref={starRef}
        points="12,2 13,7 18,7 14,10 15,15 12,12 9,15 10,10 6,7 11,7"
        fill={color}
        style={{ scale: 0, opacity: 0, transformOrigin: "center" }}
      />
      <g ref={lidRef}>
        <rect x="2" y="6" width="20" height="4" rx="1" fill={color} />
        <rect x="10" y="6" width="4" height="4" fill={color} opacity="0.7" />
      </g>
      <rect x="4" y="10" width="16" height="12" rx="1" fill={color} opacity="0.8" />
      <rect x="10" y="10" width="4" height="12" fill={color} opacity="0.6" />
    </svg>
  );
}

// Animated Music Note
export function AnimatedMusic({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const note1Ref = useRef<SVGGElement>(null);
  const note2Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(note1Ref.current, {
        y: -5,
        rotation: 10,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(note2Ref.current, {
        y: -3,
        rotation: -8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 24 24" fill={color}>
      <g ref={note1Ref}>
        <ellipse cx="7" cy="18" rx="3" ry="2.5" />
        <rect x="9.5" y="6" width="1.5" height="12" />
        <path d="M11 6 Q15 4 18 6 L18 10 Q15 8 11 10 Z" />
      </g>
    </svg>
  );
}

// Animated Church
export function AnimatedChurch({ className = "w-12 h-12", color = "#c9a959" }: { className?: string; color?: string }) {
  const bellRef = useRef<SVGEllipseElement>(null);
  const crossRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bellRef.current, {
        rotation: 15,
        transformOrigin: "center top",
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        repeatDelay: 2,
      });
      gsap.to(crossRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg className={className} viewBox="0 0 24 24" fill={color}>
      <g ref={crossRef} style={{ transformOrigin: "12px 3px" }}>
        <rect x="11" y="1" width="2" height="6" />
        <rect x="9" y="3" width="6" height="2" />
      </g>
      <polygon points="12,7 4,14 20,14" />
      <rect x="6" y="14" width="12" height="10" />
      <rect x="10" y="18" width="4" height="6" fill="white" opacity="0.5" />
      <ellipse ref={bellRef} cx="12" cy="11" rx="2" ry="1.5" fill="white" opacity="0.6" />
    </svg>
  );
}

// Floating Particles Component
export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    // Generate particles only on client-side to avoid hydration mismatch
    const newParticles = [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".particle").forEach((particle: any, i) => {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-50, 50)",
          rotation: "random(-180, 180)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [particles]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full bg-[#c9a959]/20"
          style={style}
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Note: ScrollSmoother requires GSAP Club membership
// Using a custom smooth scroll implementation instead

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Add smooth scroll behavior via CSS
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div ref={wrapperRef} className="scroll-wrapper">
      {children}
    </div>
  );
}

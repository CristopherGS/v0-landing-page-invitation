"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useMotionSettings } from "./use-motion-settings";

// Note: ScrollSmoother requires GSAP Club membership
// Using a custom smooth scroll implementation instead

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isLowEndDevice } = useMotionSettings();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: true, nullTargetWarn: false });
    gsap.ticker.lagSmoothing(800, 33);
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
    ScrollTrigger.defaults({
      once: isLowEndDevice,
    });

    // Refresh ScrollTrigger on resize
    let resizeRaf = 0;
    const handleResize = () => {
      if (resizeRaf) return;
      resizeRaf = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        resizeRaf = 0;
      });
    };

    window.addEventListener("resize", handleResize);

    // Add smooth scroll behavior via CSS when motion is allowed
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeRaf) {
        window.cancelAnimationFrame(resizeRaf);
      }
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, [prefersReducedMotion, isLowEndDevice]);

  return (
    <div ref={wrapperRef} className="scroll-wrapper">
      {children}
    </div>
  );
}

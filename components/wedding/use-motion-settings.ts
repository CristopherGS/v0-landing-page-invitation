"use client";

import { useEffect, useState } from "react";

type MotionSettings = {
  prefersReducedMotion: boolean;
  canHover: boolean;
  isLowEndDevice: boolean;
  allowHeavyAnimation: boolean;
};

export function useMotionSettings(): MotionSettings {
  const [settings, setSettings] = useState<MotionSettings>({
    // Keep server/client first render identical to avoid hydration mismatch.
    prefersReducedMotion: false,
    canHover: false,
    isLowEndDevice: false,
    allowHeavyAnimation: false,
  });

  useEffect(() => {
    const prefersReducedMotion = false;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const isLowEndDevice = coarsePointer || hardwareConcurrency <= 4 || deviceMemory <= 4;

    setSettings({
      prefersReducedMotion,
      canHover,
      isLowEndDevice,
      allowHeavyAnimation: !isLowEndDevice,
    });
  }, []);

  return settings;
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { AnimatedMusic } from "./animated-icons";

const TRACK = {
  title: "Un Pacto Con Dios - Rabito",
  artist: "Raul Tirado",
  src: "/music/pacto.mp3",
};

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const motionAllowedRef = useRef(true);

  useEffect(() => {
    motionAllowedRef.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionAllowedRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        playerRef.current,
        { x: 100, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1, delay: 2, ease: "back.out(1.7)" }
      );

      // Tooltip animation
      gsap.fromTo(
        ".music-tooltip",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 2.5 }
      );

      // Pulse animation for attention
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isPlaying && playerRef.current) {
      const bars = document.querySelectorAll(".music-bars");
      if (bars.length > 0) {
        // Playing state animation
        if (motionAllowedRef.current) {
          gsap.to(bars, {
            scaleY: "random(0.3, 1)",
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            stagger: 0.1,
            ease: "power1.inOut",
          });
        }
      }
    } else {
      const bars = document.querySelectorAll(".music-bars");
      if (bars.length > 0) {
        if (motionAllowedRef.current) {
          gsap.killTweensOf(bars);
          gsap.to(bars, { scaleY: 0.3, duration: 0.3 });
        }
      }
    }
  }, [isPlaying]);

  const togglePlay = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (motionAllowedRef.current) {
        gsap.to(".music-tooltip", { opacity: 0, y: -10, duration: 0.3 });
      }
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (motionAllowedRef.current) {
          gsap.to(playerRef.current, { scale: 1, duration: 0.3 });
        }
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          return;
        }
        if (motionAllowedRef.current) {
          gsap.fromTo(
            playerRef.current,
            { scale: 1.1 },
            { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
          );
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      if (motionAllowedRef.current) {
        gsap.fromTo(
          ".mute-btn",
          { scale: 0.8 },
          { scale: 1, duration: 0.3, ease: "back.out(2)" }
        );
      }
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Open by default on large screens, collapsed on mobile
    if (window.innerWidth >= 768) {
      setIsExpanded(true);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.75;
    }
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (!audioRef.current) return;
      if (!audioRef.current.paused) return;

      setHasInteracted(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Browser blocked autoplay; user can still tap play.
      }
    };

    // Best-effort autoplay on page load (works only in permissive browsers).
    void playAudio();

    const handlePreloaderContinue = () => {
      void playAudio();
    };
    window.addEventListener("wedding:preloader-continue", handlePreloaderContinue);

    return () => {
      window.removeEventListener("wedding:preloader-continue", handlePreloaderContinue);
    };
  }, []);

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    if (newState) {
      if (motionAllowedRef.current) {
        gsap.fromTo(controlsRef.current,
          { scale: 0.5, opacity: 0, x: 50 },
          { scale: 1, opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} loop preload="auto">
        <source src={TRACK.src} type="audio/mpeg" />
      </audio>

      {/* Floating music player */}
      <div
        ref={playerRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      >
        {/* Toggle/Player Container */}
        <div className="relative flex items-center justify-end">
          {/* Mobile Toggle Button (Visible when collapsed) */}
          <button
            onClick={toggleExpand}
            className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a959] to-[#b8963d] flex items-center justify-center text-[#0a1628] shadow-lg transition-all duration-500 z-30 ${isExpanded ? "opacity-0 scale-0 pointer-events-none absolute" : "opacity-100 scale-100"
              }`}
          >
            <AnimatedMusic className="w-6 h-6" color="#0a1628" />
            <div className="absolute inset-0 rounded-full bg-[#c9a959]/40 animate-ping" />
          </button>

          {/* Expanded Player Container */}
          <div
            ref={controlsRef}
            className={`transition-all duration-300 origin-right ${isExpanded ? "opacity-100 scale-100 visible" : "opacity-0 scale-0 invisible absolute"
              }`}
          >
            {/* Tooltip */}
            {!hasInteracted && isExpanded && (
              <div className="music-tooltip absolute -top-16 right-0 bg-[#0a1628] text-white text-xs font-sans px-4 py-3 rounded-xl shadow-xl whitespace-nowrap border border-white/10 mb-2">
                <div className="flex items-center gap-2">
                  <AnimatedMusic className="w-4 h-4" color="#c9a959" />
                  <span>Toca para escuchar musica</span>
                </div>
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#0a1628] rotate-45 border-r border-b border-white/10" />
              </div>
            )}

            {/* Controls */}
            <div className="relative">
              {/* Close/Collapse Button (Mobile only logic essentially) */}
              <button
                onClick={toggleExpand}
                className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-[#0a1628] text-[#c9a959] flex items-center justify-center border border-white/20 shadow-lg z-40 hover:bg-white/10 md:hidden"
              >
                <div className="w-3 h-0.5 bg-current rotate-45 absolute" />
                <div className="w-3 h-0.5 bg-current -rotate-45 absolute" />
              </button>

              {/* Pulse effect for controls when not interacted */}
              {!hasInteracted && (
                <div
                  ref={pulseRef}
                  className="absolute inset-0 rounded-full bg-[#c9a959]/30"
                />
              )}

              <div className="bg-[#0a1628] backdrop-blur-sm rounded-full p-1.5 flex items-center gap-2 shadow-2xl border border-white/10">
                {/* Play/Pause button */}
                <button
                  onClick={togglePlay}
                  className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#c9a959] to-[#b8963d] flex items-center justify-center text-[#0a1628] hover:shadow-lg hover:shadow-[#c9a959]/30 transition-all overflow-hidden group"
                  aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  {isPlaying ? (
                    <Pause className="w-6 h-6 relative z-10" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5 relative z-10" />
                  )}
                </button>

                {/* Music visualization bars */}
                {hasInteracted && (
                  <div className="flex items-end gap-0.5 h-8 px-2 transition-all duration-300">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="music-bars w-1 bg-[#c9a959] rounded-full origin-bottom"
                        style={{ height: "100%" }}
                      />
                    ))}
                  </div>
                )}

                {/* Mute button */}
                {hasInteracted && (
                  <button
                    onClick={toggleMute}
                    className="mute-btn w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all mr-1"
                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
              {isExpanded && (
                <p className="mt-2 text-center text-[11px] text-white/55 font-sans">
                  {TRACK.title} · {TRACK.artist}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

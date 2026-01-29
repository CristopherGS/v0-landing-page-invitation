"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { AnimatedMusic } from "./animated-icons";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      // Playing state animation
      gsap.to(".music-bars", {
        scaleY: "random(0.3, 1)",
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "power1.inOut",
      });
    } else {
      gsap.killTweensOf(".music-bars");
      gsap.to(".music-bars", { scaleY: 0.3, duration: 0.3 });
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      gsap.to(".music-tooltip", { opacity: 0, y: -10, duration: 0.3 });
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        gsap.to(playerRef.current, { scale: 1, duration: 0.3 });
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
        });
        gsap.fromTo(
          playerRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      gsap.fromTo(
        ".mute-btn",
        { scale: 0.8 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Open by default on large screens, collapsed on mobile
    if (window.innerWidth >= 768) {
      setIsExpanded(true);
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} loop preload="auto">
        {/* <source src="/music/wedding-song.mp3" type="audio/mpeg" /> */}
      </audio>

      {/* Floating music player */}
      <div
        ref={playerRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      >
        {/* Mobile Toggle Button (Visible when collapsed) */}
        {!isExpanded && (
          <button
            onClick={toggleExpand}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a959] to-[#b8963d] flex items-center justify-center text-[#0a1628] shadow-lg animate-bounce"
          >
            <AnimatedMusic className="w-6 h-6" color="#0a1628" />
          </button>
        )}

        {/* Expanded Player Container */}
        <div className={`transition-all duration-300 origin-bottom-right ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-0 h-0 w-0 overflow-hidden"}`}>

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
              className="absolute -top-3 -right-2 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs backdrop-blur-md z-20 hover:bg-white/20 md:hidden"
            >
              ✕
            </button>

            {/* Pulse effect */}
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
          </div>
        </div>
      </div>
    </>
  );
}

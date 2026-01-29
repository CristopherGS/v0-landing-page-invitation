"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      gsap.fromTo(
        playerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 2, ease: "power3.out" }
      );
    }
  }, []);

  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented, user needs to interact first
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio element - Replace src with your music file */}
      <audio ref={audioRef} loop preload="auto">
        {/* Add your audio source here */}
        {/* <source src="/music/wedding-song.mp3" type="audio/mpeg" /> */}
      </audio>

      {/* Floating music player */}
      <div
        ref={playerRef}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <div className="bg-[#0a1628] backdrop-blur-sm rounded-full p-1 flex items-center gap-1 shadow-lg border border-white/10">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#c9a959] flex items-center justify-center text-[#0a1628] hover:bg-[#d4b76a] transition-colors"
            aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {hasInteracted && (
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {!hasInteracted && (
          <div className="absolute -top-12 right-0 bg-[#0a1628] text-white text-xs font-sans px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-white/10">
            Toca para escuchar musica
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#0a1628] rotate-45 border-r border-b border-white/10" />
          </div>
        )}
      </div>
    </>
  );
}

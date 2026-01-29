"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatedRings } from "./animated-icons";

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ringLeftRef = useRef<HTMLDivElement>(null);
    const ringRightRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Lock scroll when preloader is visible
        document.body.style.overflow = "hidden";

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                    document.body.style.overflow = ""; // Restore scroll
                }
            });

            // Initial state
            gsap.set(ringLeftRef.current, { x: -100, opacity: 0 });
            gsap.set(ringRightRef.current, { x: 100, opacity: 0 });

            // Animate rings joining
            tl.to([ringLeftRef.current, ringRightRef.current], {
                x: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                stagger: {
                    from: "end", // just to ensure they start slightly different if needed, or remove for sync
                    amount: 0
                }
            })
                .to(".rings-container", { // Pulse effect when joined
                    scale: 1.2,
                    duration: 0.4,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                })
                .to(".loading-text", { // Fade out text
                    opacity: 0,
                    duration: 0.5
                }, "-=0.5")
                .to(containerRef.current, { // Fade out main container
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.2, // Small pause to admire the rings
                    ease: "power2.inOut"
                });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a1628] text-white"
        >
            <div className="rings-container relative flex items-center justify-center">
                {/* Left Ring */}
                <div ref={ringLeftRef} className="absolute">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="30" stroke="#c9a959" strokeWidth="4" />
                        <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                        {/* Shine effect */}
                        <path d="M20 20 Q40 10 60 20" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Right Ring */}
                <div ref={ringRightRef} className="absolute">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: "rotate(180deg)" }}>
                        <circle cx="40" cy="40" r="30" stroke="#c9a959" strokeWidth="4" />
                        <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                        {/* Shine effect */}
                        <path d="M20 20 Q40 10 60 20" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Center flash when they meet */}
                <div className="absolute w-1 h-1 bg-white shadow-[0_0_40px_20px_white] rounded-full opacity-0 flash-effect" />
            </div>

            <div className="loading-text mt-24 text-center">
                <p className="font-serif text-2xl text-[#c9a959] tracking-widest animate-pulse">
                    M & C
                </p>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Star, Phone, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Hotel {
    name: string;
    description: string;
    rating: number;
    tags: string[];
    phone: string;
    address: string;
    mapLink: string;
    wazeLink: string;
    website?: string;
}

const hotels: Hotel[] = [
    {
        name: "Latam Hotel Plaza Pradera",
        description: "Hotel moderno y elegante ubicado en el centro comercial Pradera Xela. Ofrece piscina en la azotea y vistas panorámicas.",
        rating: 5,
        tags: ["Moderno", "Piscina", "Shopping"],
        phone: "+502 7740 4040",
        address: "Avenida Las Americas 7-04, Zona 3, Quetzaltenango",
        mapLink: "https://maps.app.goo.gl/exampleLatam",
        wazeLink: "https://waze.com/ul/exampleLatam",
        website: "https://latamhotel.com",
    },
    {
        name: "Pensión Bonifaz",
        description: "Histórico y tradicional, situado frente al Parque Central. Perfecto para vivir la experiencia clásica de Xela.",
        rating: 4,
        tags: ["Histórico", "Céntrico", "Tradicional"],
        phone: "+502 7761 2182",
        address: "4 Calle 10-50, Zona 1, Quetzaltenango",
        mapLink: "https://maps.app.goo.gl/exampleBonifaz",
        wazeLink: "https://waze.com/ul/exampleBonifaz",
        website: "https://pensionbonifaz.com",
    },
    {
        name: "Hotel Casa Morasan",
        description: "Boutique hotel con encanto colonial y jardines hermosos. Un ambiente relajado y acogedor.",
        rating: 4.5,
        tags: ["Boutique", "Jardines", "Tranquilo"],
        phone: "+502 7761 4323",
        address: "12 Avenida 8-21, Zona 1, Quetzaltenango",
        mapLink: "https://maps.app.goo.gl/exampleMorasan",
        wazeLink: "https://waze.com/ul/exampleMorasan",
    },
    {
        name: "Airbnb / Casas de Renta",
        description: "Explora opciones de casas y apartamentos cercanos para grupos grandes o estancias mas privadas.",
        rating: 4.8,
        tags: ["Privado", "Grupos", "Flexible"],
        phone: "Varios",
        address: "Quetzaltenango (Varias zonas)",
        mapLink: "https://www.airbnb.com/s/Quetzaltenango--Guatemala/homes",
        wazeLink: "https://waze.com/ul/exampleXelaCenter",
    },
];

export function Accommodation({ id }: { id?: string }) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(
                ".hotel-title-char",
                { y: 50, opacity: 0, rotationX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".hotel-title",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Cards Staggered Reveal (3D Flip Effect)
            gsap.fromTo(
                ".hotel-card",
                {
                    y: 100,
                    opacity: 0,
                    rotationY: 45,
                    transformPerspective: 1000
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".hotels-grid",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Icon float animation
            gsap.utils.toArray(".hotel-icon-float").forEach((icon: any) => {
                gsap.to(icon, {
                    y: -5,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2 // Random delay for natural feel
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id={id} ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-20 px-6 bg-[#0a1628] overflow-hidden snap-start">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a959]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1e3a5f]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="hotel-title text-center mb-8 md:mb-12 shrink-0">
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
                        {"Hospedaje Sugerido".split("").map((char, i) => (
                            <span key={i} className="hotel-title-char inline-block whitespace-pre">
                                {char}
                            </span>
                        ))}
                    </h2>
                    <div className="w-24 h-1 bg-[#c9a959] mx-auto rounded-full opacity-50" />
                    <p className="text-white/60 font-sans mt-4 md:mt-6 text-lg max-w-2xl mx-auto">
                        Para tu comodidad, hemos seleccionado algunas de las mejores opciones de alojamiento.
                    </p>
                </div>

                <div className="hotels-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full overflow-y-auto hide-scrollbar pb-20">
                    {hotels.map((hotel, index) => (
                        <div
                            key={index}
                            className="hotel-card group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
                        >
                            {/* Image Placeholder (Gradient) */}
                            <div className="h-40 bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#c9a959]/10 group-hover:bg-[#c9a959]/20 transition-colors duration-500" />
                                <div className="hotel-icon-float absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <span className="font-serif text-3xl text-[#c9a959]">{hotel.name.charAt(0)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#c9a959] transition-colors">
                                            {hotel.name}
                                        </h3>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < Math.floor(hotel.rating) ? "text-[#c9a959] fill-[#c9a959]" : "text-white/20"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white/60 text-sm mb-6 leading-relaxed min-h-[60px]">
                                    {hotel.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {hotel.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/80 border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-white/70 text-sm">
                                        <MapPin className="w-4 h-4 text-[#c9a959]" />
                                        <span>{hotel.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/70 text-sm">
                                        <Phone className="w-4 h-4 text-[#c9a959]" />
                                        <span>{hotel.phone}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <a
                                        href={hotel.wazeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0a1628] hover:bg-[#1e3a5f] text-white text-xs font-bold transition-all border border-white/10"
                                    >
                                        <Navigation className="w-3 h-3" />
                                        Waze
                                    </a>
                                    <a
                                        href={hotel.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-[#0a1628] text-xs font-bold transition-all"
                                    >
                                        <Globe className="w-3 h-3" />
                                        Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

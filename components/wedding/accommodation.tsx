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

const buildGoogleMapsLink = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const buildWazeLink = (query: string) =>
    `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;

const hotels: Hotel[] = [
    {
        name: "Latam Hotel Plaza Pradera",
        description: "Hotel moderno ubicado en el centro comercial Pradera Xela. Ofrece piscina en la azotea, gimnasio y vistas espectaculares.",
        rating: 5,
        tags: ["Moderno", "Piscina", "CÃ©ntrico"],
        phone: "+502 7740 4040",
        address: "Avenida Las AmÃ©ricas 7-04, Zona 3, Quetzaltenango, Guatemala",
        mapLink: buildGoogleMapsLink("Latam Hotel Plaza Pradera, Avenida Las AmÃ©ricas 7-04, Zona 3, Quetzaltenango, Guatemala"),
        wazeLink: buildWazeLink("Latam Hotel Plaza Pradera, Avenida Las AmÃ©ricas 7-04, Zona 3, Quetzaltenango, Guatemala"),
        website: "https://latamhotel.com",
    },
    {
        name: "PensiÃ³n Bonifaz",
        description: "El hotel mÃ¡s icÃ³nico de Xela frente al Parque Central. TradiciÃ³n, elegancia y la mejor ubicaciÃ³n en el Centro HistÃ³rico.",
        rating: 5,
        tags: ["HistÃ³rico", "Lujo", "Tradicional"],
        phone: "+502 7761 2182",
        address: "4a Calle 10-50, Zona 1, Quetzaltenango, Guatemala",
        mapLink: buildGoogleMapsLink("PensiÃ³n Bonifaz, 4a Calle 10-50, Zona 1, Quetzaltenango, Guatemala"),
        wazeLink: buildWazeLink("PensiÃ³n Bonifaz, 4a Calle 10-50, Zona 1, Quetzaltenango, Guatemala"),
        website: "https://pensionbonifaz.com.gt",
    },
    {
        name: "Hotel Casa Morasan",
        description: "Boutique hotel con encanto colonial y jardines hermosos. Una opciÃ³n tranquila y exclusiva en el corazÃ³n de la zona 1.",
        rating: 4.5,
        tags: ["Boutique", "Jardines", "Tranquilo"],
        phone: "+502 7765 0620",
        address: "12 Avenida 8-21, Zona 1, Quetzaltenango, Guatemala",
        mapLink: buildGoogleMapsLink("Hotel Casa Morasan, 12 Avenida 8-21, Zona 1, Quetzaltenango, Guatemala"),
        wazeLink: buildWazeLink("Hotel Casa Morasan, 12 Avenida 8-21, Zona 1, Quetzaltenango, Guatemala"),
    },
    {
        name: "Hotel Modelo",
        description: "Fundado en 1892, es uno de los hoteles con mÃ¡s historia de la ciudad. Ambiente familiar y acogedor.",
        rating: 4,
        tags: ["HistÃ³rico", "Acogedor", "Familiar"],
        phone: "+502 7761 2529",
        address: "14 Avenida A 2-31, Zona 1, Quetzaltenango, Guatemala",
        mapLink: buildGoogleMapsLink("Hotel Modelo, 14 Avenida A 2-31, Zona 1, Quetzaltenango, Guatemala"),
        wazeLink: buildWazeLink("Hotel Modelo, 14 Avenida A 2-31, Zona 1, Quetzaltenango, Guatemala"),
    },
    {
        name: "Hotel Villa Real Plaza",
        description: "Ubicado a pocos pasos del Parque Central, ofrece comodidad y un servicio excelente en un edificio clÃ¡sico.",
        rating: 4,
        tags: ["UbicaciÃ³n", "ClÃ¡sico", "Servicio"],
        phone: "+502 7761 0588",
        address: "4a Calle 12-22, Zona 1, Quetzaltenango, Guatemala",
        mapLink: buildGoogleMapsLink("Hotel Villa Real Plaza, 4a Calle 12-22, Zona 1, Quetzaltenango, Guatemala"),
        wazeLink: buildWazeLink("Hotel Villa Real Plaza, 4a Calle 12-22, Zona 1, Quetzaltenango, Guatemala"),
    }
];

export function Accommodation({ id }: { id?: string }) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const prefersReducedMotion = false;
        if (prefersReducedMotion) return;

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
        <section id={id} ref={sectionRef} className="relative min-h-fit flex flex-col justify-center py-24 md:py-32 px-6 bg-[#0a1628] overflow-hidden snap-start">
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

                <div className="hotels-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20">
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

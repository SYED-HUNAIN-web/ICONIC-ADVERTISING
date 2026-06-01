"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Jeddah Yacht Club",
    category: "spatial",
    description: "Spatial Identity, Signage & Outdoor Fabrics",
    image: "/images/jeddah_yacht_club.webp",
    scale: "850 Sq. Meters",
    finishing: "VIP Brushed Brass Facades",
    calibration: "Structural Marine Grade Calibration",
    aspect: "aspect-[16/10] md:col-span-2",
  },
  {
    id: 2,
    title: "Armani Exchange",
    category: "retail",
    description: "Premium Retail Displays & Print Production",
    image: "/images/armani_exchange.jpg",
    scale: "Saudi Showrooms",
    finishing: "Backlit High-Tension Fabric Signs",
    calibration: "Color-Accuracy Calibration Index",
    aspect: "aspect-[1/1] md:col-span-1",
  },
  {
    id: 3,
    title: "Rubaiyat Store",
    category: "retail",
    description: "Luxury Boutique Stationery & Hot-Foiled Packaging",
    image: "/images/rubaiyat_store.webp",
    scale: "Flagship Retail Collections",
    finishing: "Bespoke 24K Hot Gold-Foil Stamps",
    calibration: "Embossed Fine Cotton Stock",
    aspect: "aspect-[1/1] md:col-span-1",
  },
  {
    id: 4,
    title: "Jeddah Roadside Canvas",
    category: "print",
    description: "High-Altitude Billboard Campaigns & Fabric Production",
    image: "/images/hero_billboard_1780310463480.png",
    scale: "Double-Height Highway Vistas",
    finishing: "Waterproof Weather-resistant Ink Coating",
    calibration: "High-Reach Spotlight Layouts",
    aspect: "aspect-[16/10] md:col-span-2",
  },
  {
    id: 5,
    title: "Elite Edition Lookbook",
    category: "print",
    description: "High-end Soft Touch Velvet Magazines & Catalogs",
    image: "/images/magazine_print_1780310572567.png",
    scale: "Milestone Corporate Editions",
    finishing: "Velvet Soft-Touch Foil Binding",
    calibration: "German Offset Multi-Tone Presets",
    aspect: "aspect-[16/10] md:col-span-2",
  },
  {
    id: 6,
    title: "Stationery Portfolio",
    category: "spatial",
    description: "Embossed Corporate Folders & Fine Art Print Cards",
    image: "/images/branding_mockup_1780310477402.png",
    scale: "Bespoke Executive Folders",
    finishing: "Embossed Fine Art Textured Stock",
    calibration: "Swiss Laser Precision Calibrations",
    aspect: "aspect-[1/1] md:col-span-1",
  }
];

export default function Work() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal mask text
      gsap.utils.toArray<HTMLElement>(".reveal-mask").forEach((elem) => {
        gsap.fromTo(elem, 
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: "expo.out",
            force3D: true,
            scrollTrigger: {
              trigger: elem.parentElement,
              start: "top 90%",
            }
          }
        );
      });

      // Animate project grid items entrance
      gsap.fromTo(".project-item-card",
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".project-grid",
            start: "top 85%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <main className="relative w-full bg-light-bg dark:bg-dark-bg transition-colors duration-700 pt-24 md:pt-32 pb-24 md:pb-48 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        
        {/* 1. Page Header */}
        <section className="relative min-h-[45vh] flex flex-col justify-center mb-10 md:mb-16 border-b border-light-border dark:border-dark-border pb-8 md:pb-16">
          <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest mb-6 block">[ Creative Archive ]</span>
          <div className="overflow-hidden mb-8">
            <h1 className="reveal-mask text-[8vw] leading-[0.85] font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">
              Selected <span className="font-serif italic font-light text-royal tracking-normal normal-case">Physical Creations.</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-serif font-light text-stone-600 dark:text-white/60 max-w-2xl leading-relaxed">
            A meticulous chronicle of structural graphics, boutique retail assets, and fine art offsets calibrated for Saudi Arabia's leading luxury portfolios.
          </p>
        </section>
 
        {/* 2. Interactive Filtering Controls */}
        <div className="py-6 mb-12 md:mb-24 flex flex-wrap gap-4 md:gap-8 items-center justify-start text-[10px] font-syne font-bold uppercase tracking-widest border-b border-light-border dark:border-dark-border">
          <button 
            onClick={() => setFilter("all")} 
            className={`transition-all duration-300 py-2.5 px-5 border rounded-xs ${filter === "all" ? "border-royal text-royal bg-royal/5 shadow-luxury shadow-luxury-light dark:shadow-luxury-dark" : "border-transparent text-stone-600 dark:text-white/60 hover:text-royal"}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setFilter("spatial")} 
            className={`transition-all duration-300 py-2.5 px-5 border rounded-xs ${filter === "spatial" ? "border-royal text-royal bg-royal/5 shadow-luxury shadow-luxury-light dark:shadow-luxury-dark" : "border-transparent text-stone-600 dark:text-white/60 hover:text-royal"}`}
          >
            Spatial & Marine Signs
          </button>
          <button 
            onClick={() => setFilter("retail")} 
            className={`transition-all duration-300 py-2.5 px-5 border rounded-xs ${filter === "retail" ? "border-royal text-royal bg-royal/5 shadow-luxury shadow-luxury-light dark:shadow-luxury-dark" : "border-transparent text-stone-600 dark:text-white/60 hover:text-royal"}`}
          >
            Luxury Retail Outfits
          </button>
          <button 
            onClick={() => setFilter("print")} 
            className={`transition-all duration-300 py-2.5 px-5 border rounded-xs ${filter === "print" ? "border-royal text-royal bg-royal/5 shadow-luxury shadow-luxury-light dark:shadow-luxury-dark" : "border-transparent text-stone-600 dark:text-white/60 hover:text-royal"}`}
          >
            Tactile Print & OOH
          </button>
        </div>
 
        {/* 3. Grid-Breaking Asymmetrical Project Showcase */}
        <div className="project-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full transition-all duration-500">
          {filteredProjects.map((p) => (
            <div 
              key={p.id} 
              className={`project-item-card relative shrink-0 overflow-hidden group border border-light-border dark:border-dark-border rounded-sm bg-light-surface dark:bg-dark-surface cursor-pointer shadow-luxury shadow-luxury-light dark:shadow-luxury-dark hover:shadow-2xl transition-all duration-700 ease-cinematic ${p.aspect}`}
            >
              <div className="relative w-full h-full min-h-[45vh] md:min-h-[55vh] overflow-hidden">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2s] ease-cinematic group-hover:scale-105 group-hover:skew-y-1 will-change-transform opacity-95 dark:opacity-85"
                  loading="lazy"
                />
                
                {/* Immersive overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Visual Label Info & Fine Spec Sheets on Hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 text-white select-none transition-all duration-500">
                  <span className="text-royal-hover text-xs font-syne font-bold uppercase tracking-widest mb-3 block">[ {p.category} ]</span>
                  <h3 className="text-3xl md:text-4xl font-syne font-extrabold uppercase tracking-tighter mb-4 leading-none">{p.title}</h3>
                  
                  {/* Default text */}
                  <p className="text-sm font-light opacity-80 tracking-wide leading-relaxed group-hover:translate-y-[-10px] transition-transform duration-500">{p.description}</p>
                  
                  {/* Detailed Specs sliding up on hover */}
                  <div className="border-t border-white/20 pt-4 mt-4 flex flex-col gap-2 text-[10px] font-syne font-semibold uppercase tracking-widest opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                    <div className="flex justify-between">
                      <span className="opacity-50">Scale & Scope /</span>
                      <span>{p.scale}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">Finishing /</span>
                      <span>{p.finishing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">Calibration /</span>
                      <span>{p.calibration}</span>
                    </div>
                  </div>
 
                </div>
              </div>
            </div>
          ))}
        </div>
 
      </div>
    </main>
  );
}

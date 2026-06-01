"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal mask text sliding up
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

      // Parallax for About visuals
      gsap.utils.toArray<HTMLElement>(".about-parallax").forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -10, scale: 1.15 },
          {
            yPercent: 10,
            scale: 1.0,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full bg-light-bg dark:bg-dark-bg transition-colors duration-700 pt-24 md:pt-32 pb-24 md:pb-48 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        
        {/* 1. Luxurious Editorial Header */}
        <section className="relative min-h-[50vh] flex flex-col justify-center mb-16 md:mb-32 border-b border-light-border dark:border-dark-border pb-8 md:pb-16">
          <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest mb-6 block">[ Strategic Physical Fabrications ]</span>
          <div className="overflow-hidden mb-12">
            <h1 className="reveal-mask text-[8vw] leading-[0.85] font-syne font-extrabold uppercase tracking-tighter max-w-5xl text-stone-900 dark:text-white">
              Sculpting <br />Permanent <span className="font-serif italic font-light text-royal tracking-normal normal-case">Physical Legacies.</span>
            </h1>
          </div>
          <p className="text-xl md:text-3xl font-light font-serif text-stone-600 dark:text-white/60 max-w-3xl leading-relaxed">
            Based in the vibrant heart of Jeddah, we operate at the precise intersection of heavy-duty German craftsmanship and elite creative direction. We do not just print. We shape structural realities.
          </p>
        </section>
 
        {/* 2. Asymmetric Catalog spread - The Narrative */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-48">
          
          <div className="lg:col-span-7 relative h-[60vh] md:h-[80vh] overflow-hidden rounded-sm border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark group">
            <Image 
              src="/images/magazine_print_1780310572567.png" 
              alt="Heavy Duty Luxury Craftsmanship" 
              fill 
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="about-parallax object-cover will-change-transform opacity-95 dark:opacity-85"
              priority
            />
            {/* Layered overlay box */}
            <div className="absolute top-8 right-8 bg-royal/85 text-white p-6 shadow-2xl border border-white/10 hidden md:block max-w-[180px] rounded-xs backdrop-blur-sm">
              <span className="block text-2xl font-syne font-extrabold tracking-tighter">0.1MM</span>
              <span className="text-[10px] font-syne font-semibold uppercase tracking-widest mt-2 block border-t border-white/20 pt-2 opacity-80">Precision Calibrated</span>
            </div>
            <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
            <span className="text-xs font-syne font-bold uppercase tracking-widest text-royal">[ Standard & Calibration ]</span>
            <h2 className="text-4xl md:text-5xl font-syne font-extrabold uppercase tracking-tighter leading-none text-stone-900 dark:text-white">The Unyielding Standard.</h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-stone-700 dark:text-white/70">
              For more than a decade, ICONIC ADVERTISING has set the definitive print and branding benchmark for luxury retail, real estate, and government institutions. 
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed text-stone-700 dark:text-white/70">
              Under German and Swiss engineered large-format systems, we ensure color consistency and structural perfection down to the microscopic millimeter. Every catalog, every sign, and every high-altitude campaign is treated as a strategic physical asset.
            </p>
            <div className="border-t border-light-border dark:border-dark-border pt-8 mt-4 grid grid-cols-2 gap-8">
              <div>
                <span className="block text-4xl md:text-5xl font-syne font-extrabold text-royal tracking-tighter">14+</span>
                <span className="text-[10px] font-syne font-semibold uppercase tracking-wider text-stone-500 dark:text-white/50 block mt-1">Years of Jeddah Legacy</span>
              </div>
              <div>
                <span className="block text-4xl md:text-5xl font-syne font-extrabold text-royal tracking-tighter">100%</span>
                <span className="text-[10px] font-syne font-semibold uppercase tracking-wider text-stone-500 dark:text-white/50 block mt-1">In-house Production</span>
              </div>
            </div>
          </div>
 
        </section>
 
        {/* 3. High-Contrast Strategic Pillars - Integrated Visual Grid */}
        <section className="mb-24 md:mb-48 border-t border-light-border dark:border-dark-border pt-12 md:pt-24">
          
          <div className="overflow-hidden mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <h2 className="reveal-mask text-4xl md:text-7xl font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">
              Strategic Pillars
            </h2>
            <p className="text-lg font-serif italic text-stone-500 dark:text-white/60 max-w-sm leading-relaxed">
              We separate our fabrication parameters into three distinct craft dimensions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Pillar 1 */}
            <div className="flex flex-col gap-6 p-8 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-sm shadow-luxury shadow-luxury-light dark:shadow-luxury-dark hover:translate-y-[-8px] transition-transform duration-500">
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-4 border border-black/5 dark:border-white/5">
                <Image 
                  src="/images/luxury_print_craft.png" 
                  alt="Immersive Print" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover opacity-95 dark:opacity-85" 
                  loading="lazy" 
                />
              </div>
              <div className="flex justify-between items-center text-stone-900 dark:text-white">
                <h3 className="text-xl font-syne font-bold uppercase tracking-tight">Immersive Print</h3>
                <span className="text-royal font-syne font-bold text-xs">01 /</span>
              </div>
              <p className="font-light text-sm text-stone-700 dark:text-white/70 leading-relaxed">
                Utilizing high-end textured sheets, hot gold-foil stamping, and custom hand embossing. We deliver magazines, portfolios, and catalogues that demand physical presence.
              </p>
            </div>
 
            {/* Pillar 2 */}
            <div className="flex flex-col gap-6 p-8 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-sm shadow-luxury shadow-luxury-light dark:shadow-luxury-dark hover:translate-y-[-8px] transition-transform duration-500 md:translate-y-8">
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-4 border border-black/5 dark:border-white/5">
                <Image 
                  src="/images/boutique_retail_facade.png" 
                  alt="Spatial Identity" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover opacity-95 dark:opacity-85" 
                  loading="lazy" 
                />
              </div>
              <div className="flex justify-between items-center text-stone-900 dark:text-white">
                <h3 className="text-xl font-syne font-bold uppercase tracking-tight">Spatial Identity</h3>
                <span className="text-royal font-syne font-bold text-xs">02 /</span>
              </div>
              <p className="font-light text-sm text-stone-700 dark:text-white/70 leading-relaxed">
                Structural storefronts, illuminated neon signages, premium showroom wrap graphics, and marine assets. We turn physical locations into brand landmarks.
              </p>
            </div>
 
            {/* Pillar 3 */}
            <div className="flex flex-col gap-6 p-8 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-sm shadow-luxury shadow-luxury-light dark:shadow-luxury-dark hover:translate-y-[-8px] transition-transform duration-500">
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-4 border border-black/5 dark:border-white/5">
                <Image 
                  src="/images/outdoor_billboard_night.png" 
                  alt="High-Altitude Media" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover opacity-95 dark:opacity-85" 
                  loading="lazy" 
                />
              </div>
              <div className="flex justify-between items-center text-stone-900 dark:text-white">
                <h3 className="text-xl font-syne font-bold uppercase tracking-tight">High-Altitude Media</h3>
                <span className="text-royal font-syne font-bold text-xs">03 /</span>
              </div>
              <p className="font-light text-sm text-stone-700 dark:text-white/70 leading-relaxed">
                Colossal highway billboards, architectural digital overlays, and premium street signage campaigns. We construct high-reach physical vistas in Jeddah.
              </p>
            </div>
 
          </div>
        </section>
 
        {/* 4. The Engineering Facts - Double Layer Visual Overlay */}
        <section className="relative w-full py-24 bg-royal text-white px-8 md:px-16 rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-32">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-60 block">[ Modern Fabrication Campus ]</span>
              <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter leading-none">Built For Massive Scales.</h2>
              <p className="text-lg font-serif italic opacity-85 leading-relaxed">
                We operate our own state-of-the-art print fabrication campus in Jeddah, housing UV flatbeds, precision laser cutters, and custom folder templates. Zero outsourcing. Complete precision control.
              </p>
              
              <div className="relative aspect-[16/9] w-full mt-6 rounded-sm overflow-hidden border border-white/10 shadow-xl hidden md:block">
                <Image 
                  src="/images/premium_packaging_mockup.png" 
                  alt="Swiss calibrations" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-90" 
                  loading="lazy" 
                />
              </div>
            </div>
 
            <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:gap-12 border-l border-white/10 pl-8 md:pl-16">
              <div>
                <span className="block text-4xl md:text-6xl font-syne font-extrabold tracking-tighter">250K+</span>
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-60 block mt-1">Sq. Meters Fabricated</span>
              </div>
              <div>
                <span className="block text-4xl md:text-6xl font-syne font-extrabold tracking-tighter">120+</span>
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-60 block mt-1">Luxury Retailers Served</span>
              </div>
              <div>
                <span className="block text-4xl md:text-6xl font-syne font-extrabold tracking-tighter">24/7</span>
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-60 block mt-1">Account Liaisons</span>
              </div>
              <div>
                <span className="block text-4xl md:text-6xl font-syne font-extrabold tracking-tighter">Swiss</span>
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-60 block mt-1">Precision Calibrations</span>
              </div>
            </div>
 
          </div>
        </section>
 
      </div>
    </main>
  );
}

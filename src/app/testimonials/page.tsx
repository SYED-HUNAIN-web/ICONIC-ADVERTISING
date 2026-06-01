"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
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

      // Subtle parallax on testimonial images
      gsap.utils.toArray<HTMLElement>(".case-parallax").forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
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
        
        {/* 1. Luxurious Header */}
        <section className="relative min-h-[45vh] flex flex-col justify-center mb-12 md:mb-24 border-b border-light-border dark:border-dark-border pb-8 md:pb-16">
          <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest mb-6 block">[ High-Status Collaborations ]</span>
          <div className="overflow-hidden mb-8">
            <h1 className="reveal-mask text-[8vw] leading-[0.85] font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">
              Client <span className="font-serif italic font-light text-royal tracking-normal normal-case">Chronicles.</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-serif font-light text-stone-600 dark:text-white/60 max-w-2xl leading-relaxed">
            Detailed campaign syntheses and spatial print narratives from high-profile leaders who refuse compromise on quality.
          </p>
        </section>
 
        {/* 2. Visual Double-Spread Case Studies */}
        <div className="flex flex-col gap-28 md:gap-64 w-full mt-24">
          
          {/* Case Study 1: Armani Exchange */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-light-border dark:border-dark-border pt-12 md:pt-24">
            
            {/* Left Spread: Primary Image */}
            <div className="lg:col-span-6 relative h-[50vh] md:h-[70vh] overflow-hidden rounded-sm border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark group">
              <Image 
                src="/images/armani_exchange.jpg" 
                alt="Armani Exchange Visual Campaign" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="case-parallax object-cover will-change-transform opacity-95 dark:opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
 
            {/* Right Spread: Secondary Image, Quote, Details */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              
              <div className="flex justify-between items-center border-b border-light-border dark:border-dark-border pb-4">
                <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest">Armani Exchange Saudi Arabia</span>
                <span className="text-xs font-light text-stone-400 dark:text-white/40">[ CASE / 01 ]</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-syne font-extrabold uppercase tracking-tighter leading-none text-stone-900 dark:text-white">Campaign Synthesis</h2>
              
              <blockquote className="text-2xl font-serif italic font-light leading-relaxed text-stone-850 dark:text-white/85 border-l-4 border-royal pl-6 py-2 my-2">
                "ICONIC transformed our local campaigns in Jeddah. Their custom print direction, high-tension lightbox fabrication, and absolute color accuracy for Armani Exchange was flawless."
              </blockquote>
 
              <div className="text-xs font-syne font-bold uppercase tracking-wider text-stone-600 dark:text-white/60">
                <span className="block font-extrabold text-stone-900 dark:text-white">Retail Marketing Director</span>
                <span>Armani Exchange - Jeddah Liaison</span>
              </div>
 
              {/* Nested Close-up Detail Image for storytelling depth */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-light-surface/40 dark:bg-dark-surface/40 p-6 border border-light-border dark:border-dark-border rounded-sm shadow-luxury shadow-luxury-light dark:shadow-luxury-dark mt-4 backdrop-blur-xs">
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-[1/1] w-full rounded-sm overflow-hidden border border-black/5 dark:border-white/5">
                  <Image 
                    src="/images/luxury_print_craft.png" 
                    alt="Precision close-up detail" 
                    fill 
                    sizes="200px"
                    className="object-cover opacity-95 dark:opacity-85" 
                    loading="lazy" 
                  />
                </div>
                <div className="md:col-span-7 flex flex-col gap-2">
                  <span className="text-[9px] font-syne font-bold uppercase tracking-wider text-royal">Tactile print verification</span>
                  <p className="text-xs font-light leading-relaxed text-stone-700 dark:text-white/70">
                    We delivered high-resolution backlit foils calibrated under heavy-duty Swiss offset printers, ensuring flawless visual luxury levels.
                  </p>
                </div>
              </div>
 
            </div>
          </section>
 
          {/* Case Study 2: Rubaiyat Store */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-light-border dark:border-dark-border pt-12 md:pt-24">
            
            {/* Left Spread: Primary Image */}
            <div className="lg:col-span-6 relative h-[50vh] md:h-[70vh] overflow-hidden rounded-sm border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark group lg:order-2">
              <Image 
                src="/images/rubaiyat_store.webp" 
                alt="Rubaiyat Store Luxury Packaging" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="case-parallax object-cover will-change-transform opacity-95 dark:opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
 
            {/* Right Spread: Details */}
            <div className="lg:col-span-6 flex flex-col gap-8 lg:order-1">
              
              <div className="flex justify-between items-center border-b border-light-border dark:border-dark-border pb-4">
                <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest">Rubaiyat boutiques</span>
                <span className="text-xs font-light text-stone-400 dark:text-white/40">[ CASE / 02 ]</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-syne font-extrabold uppercase tracking-tighter leading-none text-stone-900 dark:text-white">Identity Foil Stamping</h2>
              
              <blockquote className="text-2xl font-serif italic font-light leading-relaxed text-stone-850 dark:text-white/85 border-l-4 border-royal pl-6 py-2 my-2">
                "For our flagship locations, details are everything. ICONIC delivered custom boutique packaging boxes that captured the soul of our high-end branding. The hand-foiled gold details and custom envelope embossings were exceptional."
              </blockquote>
 
              <div className="text-xs font-syne font-bold uppercase tracking-wider text-stone-600 dark:text-white/60">
                <span className="block font-extrabold text-stone-900 dark:text-white">Brand Director</span>
                <span>Rubaiyat Store - Corporate Headquarters</span>
              </div>
 
              {/* Nested Detail Close-up */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-light-surface/40 dark:bg-dark-surface/40 p-6 border border-light-border dark:border-dark-border rounded-sm shadow-luxury shadow-luxury-light dark:shadow-luxury-dark mt-4 backdrop-blur-xs">
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-[1/1] w-full rounded-sm overflow-hidden border border-black/5 dark:border-white/5">
                  <Image 
                    src="/images/premium_packaging_mockup.png" 
                    alt="Packaging craft close-up" 
                    fill 
                    sizes="200px"
                    className="object-cover opacity-95 dark:opacity-85" 
                    loading="lazy" 
                  />
                </div>
                <div className="md:col-span-7 flex flex-col gap-2">
                  <span className="text-[9px] font-syne font-bold uppercase tracking-wider text-royal">Packaging craft details</span>
                  <p className="text-xs font-light leading-relaxed text-stone-700 dark:text-white/70">
                    Hand-crafted velvet gift packaging with custom 24k gold leaf foil printing, manufactured inside our Jeddah campus.
                  </p>
                </div>
              </div>
 
            </div>
          </section>
 
          {/* Case Study 3: Jeddah Yacht Club */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-light-border dark:border-dark-border pt-12 md:pt-24">
            
            {/* Left Spread: Primary Image */}
            <div className="lg:col-span-6 relative h-[50vh] md:h-[70vh] overflow-hidden rounded-sm border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark group">
              <Image 
                src="/images/jeddah_yacht_club.webp" 
                alt="Jeddah Yacht Club Spatial Signage" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="case-parallax object-cover will-change-transform opacity-95 dark:opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
 
            {/* Right Spread: Details */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              
              <div className="flex justify-between items-center border-b border-light-border dark:border-dark-border pb-4">
                <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest">Jeddah Yacht Club & Marina</span>
                <span className="text-xs font-light text-stone-400 dark:text-white/40">[ CASE / 03 ]</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-syne font-extrabold uppercase tracking-tighter leading-none text-stone-900 dark:text-white">Spatial Oceanside Facades</h2>
              
              <blockquote className="text-2xl font-serif italic font-light leading-relaxed text-stone-850 dark:text-white/85 border-l-4 border-royal pl-6 py-2 my-2">
                "The grand opening demanded structural signage of colossal proportions and absolute weather resistance. ICONIC delivered structural brass elements and custom maritime fabric wraps that commanded immediate attention."
              </blockquote>
 
              <div className="text-xs font-syne font-bold uppercase tracking-wider text-stone-600 dark:text-white/60">
                <span className="block font-extrabold text-stone-900 dark:text-white">Director of Operations</span>
                <span>Jeddah Yacht Club & Marina Asset</span>
              </div>
 
              {/* Nested Detail Close-up */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-light-surface/40 dark:bg-dark-surface/40 p-6 border border-light-border dark:border-dark-border rounded-sm shadow-luxury shadow-luxury-light dark:shadow-luxury-dark mt-4 backdrop-blur-xs">
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-[1/1] w-full rounded-sm overflow-hidden border border-black/5 dark:border-white/5">
                  <Image 
                    src="/images/outdoor_billboard_night.png" 
                    alt="Twilight Signage campaign" 
                    fill 
                    sizes="200px"
                    className="object-cover opacity-95 dark:opacity-85" 
                    loading="lazy" 
                  />
                </div>
                <div className="md:col-span-7 flex flex-col gap-2">
                  <span className="text-[9px] font-syne font-bold uppercase tracking-wider text-royal">OOH Spotlight calibration</span>
                  <p className="text-xs font-light leading-relaxed text-stone-700 dark:text-white/70">
                    Grand structural signage wraps made to withstand sea wind, accompanied by twilight spotlight alignments.
                  </p>
                </div>
              </div>
 
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}

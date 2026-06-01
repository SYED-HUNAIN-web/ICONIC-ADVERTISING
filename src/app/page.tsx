"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero3D from "@/components/Hero3D";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hardware-accelerated image parallax loops for portfolio cards
      gsap.utils.toArray<HTMLElement>(".img-parallax").forEach((img) => {
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

      // 2. Slow drifting text parallax for subpages
      gsap.utils.toArray<HTMLElement>(".text-parallax").forEach((text) => {
        gsap.fromTo(text,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: text.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      });

      // 3. True Multi-Plane Hero Scroll Parallax
      // Background 3D Layer moves extremely slowly
      gsap.to(".hero-3d-wrap", {
        yPercent: -10,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Midground floating cards move at staggered speeds creating parallax depth
      gsap.to(".hero-float-card-1", {
        yPercent: -35,
        rotate: -3,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
      gsap.to(".hero-float-card-2", {
        yPercent: -15,
        rotate: 4,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
      gsap.to(".hero-float-card-3", {
        yPercent: -45,
        rotate: -6,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
      gsap.to(".hero-float-card-4", {
        yPercent: -25,
        rotate: 5,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      // Foreground typography drifts slowly in opposite direction for layered spatial separation
      gsap.to(".hero-scaling-text", {
        yPercent: 12,
        opacity: 0.05,
        scale: 0.95,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });

      // 4. Horizontal Pinning Work Showcase
      if (horizontalRef.current && horizontalScrollRef.current) {
        const wrap = horizontalScrollRef.current as HTMLElement;
        const totalWidth = wrap.scrollWidth - window.innerWidth;
        
        gsap.to(wrap, {
          x: -totalWidth,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + totalWidth
          }
        });
      }

      // 5. Staggered Mask Reveals for section headers
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] as any
      }
    })
  };

  return (
    <main className="relative w-full bg-light-bg dark:bg-dark-bg transition-colors duration-700 overflow-hidden" ref={containerRef}>
      
      {/* 1. Cinematic Luxury Hero Section */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Backdrop Spotlight (Warm champagne / Deep indigo) */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(240,230,210,0.4)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,38,107,0.3)_0%,transparent_60%)]" />

        {/* Editorial Structural Framing */}
        <div className="absolute inset-8 z-10 pointer-events-none border border-stone-200/40 dark:border-white/5 rounded-sm" />
        <div className="absolute inset-16 z-10 pointer-events-none border border-stone-200/20 dark:border-white/[0.02] rounded-sm hidden md:block" />

        {/* Layer 1: Background WebGL Torus (Reduced dominance, behind everything) */}
        <div className="hero-3d-wrap absolute inset-0 z-0 h-full w-full pointer-events-none will-change-transform opacity-30 dark:opacity-40">
          <Hero3D />
        </div>

        {/* Layer 2-4: Midground Layered Image Collage Cluster (z-10, behind text, in front of WebGL) */}
        {/* Card 1: Top-Left Print Stamping */}
        <div className="absolute left-[12%] top-[15%] z-10 w-[14vw] hidden lg:block hero-float-card-1 will-change-transform pointer-events-none">
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-black/[0.06] dark:border-white/[0.06] shadow-2xl bg-light-surface dark:bg-dark-surface">
            <Image 
              src="/images/luxury_print_craft.png" 
              alt="Premium Stamping Craft" 
              fill
              sizes="14vw"
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute bottom-3 left-3 text-[8px] font-syne font-bold uppercase tracking-widest bg-light-bg/85 dark:bg-dark-bg/85 text-light-accent dark:text-white px-2 py-0.5 backdrop-blur-sm rounded-xs">
              Print / 24K Gold Stamping
            </div>
          </div>
        </div>

        {/* Card 2: Right-Center Boutique Facade */}
        <div className="absolute right-[14%] top-[35%] z-10 w-[18vw] hidden lg:block hero-float-card-2 will-change-transform pointer-events-none">
          <div className="relative aspect-[1/1] w-full rounded-sm overflow-hidden border border-black/[0.06] dark:border-white/[0.06] shadow-2xl bg-light-surface dark:bg-dark-surface">
            <Image 
              src="/images/boutique_retail_facade.png" 
              alt="Sleek Storefront Facade" 
              fill
              sizes="18vw"
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute bottom-3 left-3 text-[8px] font-syne font-bold uppercase tracking-widest bg-light-bg/85 dark:bg-dark-bg/85 text-light-accent dark:text-white px-2 py-0.5 backdrop-blur-sm rounded-xs">
              Retail / Flagship Signage
            </div>
          </div>
        </div>

        {/* Card 3: Deep-Depth Top-Right Highway Billboard */}
        <div className="absolute right-[24%] top-[12%] z-10 w-[19vw] hidden lg:block hero-float-card-3 will-change-transform pointer-events-none">
          <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-black/[0.06] dark:border-white/[0.06] shadow-2xl bg-light-surface dark:bg-dark-surface">
            <Image 
              src="/images/outdoor_billboard_night.png" 
              alt="Highway Billboard Twilight View" 
              fill
              sizes="19vw"
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute bottom-3 left-3 text-[8px] font-syne font-bold uppercase tracking-widest bg-light-bg/85 dark:bg-dark-bg/85 text-light-accent dark:text-white px-2 py-0.5 backdrop-blur-sm rounded-xs">
              OOH / Billboard Scale
            </div>
          </div>
        </div>

        {/* Card 4: Forward-Depth Bottom-Left Bespoke Stationery */}
        <div className="absolute left-[24%] bottom-[12%] z-10 w-[12vw] hidden lg:block hero-float-card-4 will-change-transform pointer-events-none">
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-black/[0.06] dark:border-white/[0.06] shadow-2xl bg-light-surface dark:bg-dark-surface">
            <Image 
              src="/images/premium_packaging_mockup.png" 
              alt="Custom Bespoke Stationery Mockup" 
              fill
              sizes="12vw"
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute bottom-3 left-3 text-[8px] font-syne font-bold uppercase tracking-widest bg-light-bg/85 dark:bg-dark-bg/85 text-light-accent dark:text-white px-2 py-0.5 backdrop-blur-sm rounded-xs">
              Identity / Rigid Box Embossing
            </div>
          </div>
        </div>

        {/* Layer 5: Foreground Typography Heading (z-30, absolute visual dominant focus) */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center">
          <div className="w-full px-6 flex flex-col items-center hero-scaling-text will-change-transform">
            
            {/* "ICONIC" (Massive Modern Luxury Editorial Sans) */}
            <div className="overflow-hidden">
              <motion.h1 
                custom={0} 
                initial="hidden" 
                animate="visible" 
                variants={headlineVariants} 
                className="text-[14vw] leading-[0.8] font-syne font-extrabold uppercase tracking-tighter text-center text-stone-900 dark:text-white filter drop-shadow-md"
              >
                Iconic
              </motion.h1>
            </div>
            
            {/* "ADVERTISING" (Elegant High-Contrast Luxury Serif Italic) */}
            <div className="overflow-hidden">
              <motion.h2 
                custom={1} 
                initial="hidden" 
                animate="visible" 
                variants={headlineVariants} 
                className="text-[6.5vw] md:text-[5vw] leading-none font-serif italic font-normal tracking-normal ml-[12vw] md:ml-[15vw] -mt-2 md:-mt-4 text-royal dark:text-white/80 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                Advertising
              </motion.h2>
            </div>

          </div>
        </div>

        {/* Floating Taglines & Scroll Indicators (Foreground content, z-30) */}
        <div className="absolute bottom-12 left-6 right-6 z-30 flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="flex flex-col gap-1.5"
          >
            <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-royal block">[ Strategic Creative Partners ]</span>
            <p className="text-[11px] font-syne font-semibold uppercase tracking-widest leading-relaxed text-stone-600 dark:text-white/60">
              Forging Physical Realities & Elite Branding Legacies
              <br />Based in Jeddah, Saudi Arabia
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="hidden md:block"
          >
             <span className="text-[9px] font-syne font-bold uppercase tracking-widest text-stone-400 dark:text-white/40 rotate-90 origin-bottom-right block translate-x-2">Scroll To Explore</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Asymmetric, Layered Editorial Expertise Section */}
      <section className="relative w-full py-20 md:py-48 bg-light-bg dark:bg-dark-bg z-20 transition-colors duration-700">
        <div className="container mx-auto px-6 relative">
          
          <div className="overflow-hidden mb-16 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <h2 className="reveal-mask text-[8vw] leading-[0.85] font-syne font-extrabold tracking-tighter uppercase text-stone-900 dark:text-white">
              Our <span className="text-royal">Expertise</span>
            </h2>
            <p className="text-lg md:text-xl font-serif italic font-light text-stone-600 dark:text-white/60 max-w-md leading-relaxed">
              We operate at the interface of architectural fabrication and creative direction. We do not construct advertisements; we shape permanent structures.
            </p>
          </div>

          <div className="flex flex-col gap-28 md:gap-64 mt-24">
            
            {/* Service 1: Printing */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative">
              <div className="lg:col-span-7 relative h-[65vh] w-full overflow-hidden border border-light-border dark:border-dark-border group shadow-luxury shadow-luxury-light dark:shadow-luxury-dark rounded-sm">
                <Image 
                  src="/images/magazine_print_1780310572567.png" 
                  alt="High-end Printing" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="img-parallax object-cover will-change-transform" 
                  loading="lazy" 
                />
                
                {/* Embedded Overlapping Secondary Image */}
                <div className="absolute bottom-8 right-8 w-[220px] aspect-[4/3] hidden md:block border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden z-20 rounded-sm">
                  <Image 
                    src="/images/luxury_print_craft.png" 
                    alt="Gold Foil Detail" 
                    fill 
                    sizes="220px"
                    className="object-cover" 
                    loading="lazy" 
                  />
                </div>
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              
              <div className="lg:col-span-5 flex flex-col gap-6 text-parallax will-change-transform">
                <div className="flex items-center gap-4 text-xs font-syne font-bold uppercase tracking-widest text-royal">
                  <span>[ 01 / Print Craft ]</span>
                  <span className="h-[1px] w-12 bg-royal/40" />
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">Tactile.</h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-stone-700 dark:text-white/70">
                  Using state-of-the-art Swiss flatbed UV offset technology and sample templates. We engineer visual catalogues and high-texture portfolios that command physical authority.
                </p>
                <div className="flex flex-wrap gap-3 pt-4 text-[10px] font-syne font-semibold uppercase tracking-wider text-stone-500 dark:text-white/50">
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">24K Gold Foiling</span>
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">600 GSM Cotton Sheets</span>
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">Swiss UV Press</span>
                </div>
              </div>
            </div>

            {/* Service 2: Publishing */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative lg:flex-row-reverse">
              <div className="lg:col-span-7 lg:order-2 relative h-[65vh] w-full overflow-hidden border border-light-border dark:border-dark-border group shadow-luxury shadow-luxury-light dark:shadow-luxury-dark rounded-sm">
                <Image 
                  src="/images/branding_mockup_1780310477402.png" 
                  alt="Premium Publishing" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="img-parallax object-cover will-change-transform" 
                  loading="lazy" 
                />
                
                {/* Embedded Overlapping Secondary Image */}
                <div className="absolute bottom-8 left-8 w-[200px] aspect-[1/1] hidden md:block border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden z-20 rounded-sm">
                  <Image 
                    src="/images/premium_packaging_mockup.png" 
                    alt="Embossed Box" 
                    fill 
                    sizes="200px"
                    className="object-cover" 
                    loading="lazy" 
                  />
                </div>
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              
              <div className="lg:col-span-5 lg:order-1 flex flex-col gap-6 text-parallax will-change-transform">
                <div className="flex items-center gap-4 text-xs font-syne font-bold uppercase tracking-widest text-royal">
                  <span>[ 02 / Publishing ]</span>
                  <span className="h-[1px] w-12 bg-royal/40" />
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">Heritage.</h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-stone-700 dark:text-white/70">
                  Masterfully styled layouts that document corporate milestones. From rigid luxury gift wrapping box designs to premium velvet soft-touch folders. 
                </p>
                <div className="flex flex-wrap gap-3 pt-4 text-[10px] font-syne font-semibold uppercase tracking-wider text-stone-500 dark:text-white/50">
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">Hot Embossing</span>
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">Premium Stationery</span>
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">Velvet Overlays</span>
                </div>
              </div>
            </div>

            {/* Service 3: Marketing */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative">
              <div className="lg:col-span-7 relative h-[65vh] w-full overflow-hidden border border-light-border dark:border-dark-border group shadow-luxury shadow-luxury-light dark:shadow-luxury-dark rounded-sm">
                <Image 
                  src="/images/hero_billboard_1780310463480.png" 
                  alt="Billboard Marketing" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="img-parallax object-cover will-change-transform" 
                  loading="lazy" 
                />
                
                {/* Embedded Overlapping Secondary Image */}
                <div className="absolute top-8 right-8 w-[240px] aspect-[16/9] hidden md:block border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden z-20 rounded-sm">
                  <Image 
                    src="/images/outdoor_billboard_night.png" 
                    alt="Twilight Billboard Campaign" 
                    fill 
                    sizes="240px"
                    className="object-cover" 
                    loading="lazy" 
                  />
                </div>
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              
              <div className="lg:col-span-5 flex flex-col gap-6 text-parallax will-change-transform">
                <div className="flex items-center gap-4 text-xs font-syne font-bold uppercase tracking-widest text-royal">
                  <span>[ 03 / OOH Advertising ]</span>
                  <span className="h-[1px] w-12 bg-royal/40" />
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">Monolithic.</h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-stone-700 dark:text-white/70">
                  Imposing spatial presences on high-traffic corridors across Jeddah. We design double-height billboards and architectural wraps built to command local landscapes under evening spotlights.
                </p>
                <div className="flex flex-wrap gap-3 pt-4 text-[10px] font-syne font-semibold uppercase tracking-wider text-stone-500 dark:text-white/50">
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">High-Altitude Media</span>
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">Architectural Signage</span>
                  <span className="border border-light-border dark:border-white/10 px-3 py-1 rounded-xs">Evening Spotlighting</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GSAP Horizontal Pinning Work Showcase Section */}
      <section ref={horizontalRef} className="h-screen w-full bg-light-surface dark:bg-dark-surface overflow-hidden flex items-center relative z-30 transition-colors duration-700 border-y border-light-border dark:border-dark-border shadow-inner">
        <div className="absolute top-12 left-6 md:left-12 z-40 mix-blend-difference text-white">
          <div className="overflow-hidden">
            <h2 className="reveal-mask text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter">Featured Case Studies</h2>
          </div>
        </div>
        
        <div ref={horizontalScrollRef} className="flex h-[75vh] items-center gap-12 md:gap-32 px-[10vw] pt-24 w-[300vw] md:w-[250vw]">
          
          {/* Jeddah Yacht Club */}
          <div className="relative w-[80vw] md:w-[60vw] h-full shrink-0 overflow-hidden group shadow-luxury shadow-luxury-light dark:shadow-luxury-dark border border-light-border dark:border-dark-border rounded-sm">
            <Image 
              src="/images/jeddah_yacht_club.webp" 
              alt="Jeddah Yacht Club" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-105 will-change-transform" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12 text-white">
              <span className="text-royal-hover text-xs font-syne font-bold uppercase tracking-widest mb-3">Jeddah Yacht Club & Marina</span>
              <h3 className="text-3xl md:text-5xl font-syne font-extrabold uppercase tracking-tighter mb-4">Branded Oceanside Facades</h3>
              <p className="text-white/60 font-serif italic text-sm md:text-base max-w-xl">Architectural maritime graphics, brushed gold VIP badges, and tensioned fabric marine banners.</p>
            </div>
          </div>
 
          {/* Armani Exchange */}
          <div className="relative w-[65vw] md:w-[45vw] h-[85%] shrink-0 overflow-hidden group shadow-luxury shadow-luxury-light dark:shadow-luxury-dark border border-light-border dark:border-dark-border rounded-sm">
            <Image 
              src="/images/armani_exchange.jpg" 
              alt="Armani Exchange" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-105 will-change-transform" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12 text-white">
              <span className="text-royal-hover text-xs font-syne font-bold uppercase tracking-widest mb-3">Armani Exchange Saudi Arabia</span>
              <h3 className="text-3xl md:text-4xl font-syne font-extrabold uppercase tracking-tighter mb-4">Retail Campaign Synthesis</h3>
              <p className="text-white/60 font-serif italic text-sm md:text-base max-w-sm">High-impact window sheets, custom backlit retail fabric signs, and soft lookbook print sheets.</p>
            </div>
          </div>
 
          {/* Rubaiyat Store */}
          <div className="relative w-[75vw] md:w-[55vw] h-full shrink-0 overflow-hidden group shadow-luxury shadow-luxury-light dark:shadow-luxury-dark border border-light-border dark:border-dark-border rounded-sm">
            <Image 
              src="/images/rubaiyat_store.webp" 
              alt="Rubaiyat Store" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-105 will-change-transform" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12 text-white">
              <span className="text-royal-hover text-xs font-syne font-bold uppercase tracking-widest mb-3">Rubaiyat Flagship Boutiques</span>
              <h3 className="text-3xl md:text-5xl font-syne font-extrabold uppercase tracking-tighter mb-4">Bespoke Boutique Packaging</h3>
              <p className="text-white/60 font-serif italic text-sm md:text-base max-w-md">Embossed catalog packaging boxes, hot-foiled golden lettering, and custom fine cotton paper details.</p>
            </div>
          </div>
 
        </div>
      </section>
 
      {/* 4. Elegant Editorial Collage (Why Choose Us) */}
      <section className="relative py-20 md:py-48 bg-light-bg dark:bg-dark-bg overflow-hidden transition-colors duration-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left text column */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
              <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest">[ The Standards of Excellence ]</span>
              <h2 className="text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter leading-none text-stone-900 dark:text-white">
                We Don't Just Execute. <br />We <span className="font-serif italic font-light text-royal tracking-normal normal-case">Co-Author.</span>
              </h2>
              <p className="text-lg md:text-xl font-light text-stone-700 dark:text-white/70 leading-relaxed">
                Physical details carry the exact status of your brand. In the luxury sectors of Jeddah and Riyadh, compromise is a structural failure. We build custom fabrications designed to command absolute status.
              </p>
              
              <div className="mt-4">
                <Link href="/about" className="inline-flex items-center gap-4 text-xs font-syne font-bold uppercase tracking-widest border-b-2 border-royal pb-2 text-royal hover:text-royal-hover hover:border-royal-hover transition-colors">
                  Explore Our Legacy <span>✦</span>
                </Link>
              </div>
            </div>
 
            {/* Right Asymmetrical Gallery Collage - Image Heavy */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              
              {/* Image 1: Gold Stamping Detail */}
              <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark md:translate-y-12">
                <Image 
                  src="/images/luxury_print_craft.png" 
                  alt="Gold foil craft details" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover opacity-95 dark:opacity-80 hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
              </div>
 
              {/* Image 2: Boutique box details */}
              <div className="relative aspect-[1/1] w-full rounded-sm overflow-hidden border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark">
                <Image 
                  src="/images/premium_packaging_mockup.png" 
                  alt="Custom bespoke boxes" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover opacity-95 dark:opacity-80 hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
              </div>
 
              {/* Image 3: Large Billboard twilight view */}
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark md:col-span-2 mt-8">
                <Image 
                  src="/images/outdoor_billboard_night.png" 
                  alt="Highway luxury billboard" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover opacity-95 dark:opacity-80 hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
              </div>
 
              {/* Overlapping Floating Typography Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-royal text-white px-8 py-8 rounded-sm shadow-2xl border border-white/10 hidden md:block max-w-[180px] text-center select-none rotate-6">
                <span className="block text-4xl font-syne font-extrabold tracking-tighter uppercase">Swiss</span>
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest block mt-2 border-t border-white/20 pt-2 opacity-80">Precision Calibrated</span>
              </div>
 
            </div>
 
          </div>
        </div>
      </section>
 
      {/* 5. Client Marquee (Optimized Pure CSS Loop running on GPU compositor) */}
      <section className="overflow-hidden w-full py-16 bg-royal text-white border-y border-white/10 select-none shadow-2xl">
        <div className="flex whitespace-nowrap w-[200%]">
          <div className="animate-marquee flex items-center gap-16 text-[4vw] font-syne font-extrabold uppercase tracking-tighter px-8">
            <span>Armani Exchange</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
            <span>Rubaiyat Store</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
            <span>Jeddah Yacht Club</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
            <span>Premium Signage</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
          </div>
          <div className="animate-marquee flex items-center gap-16 text-[4vw] font-syne font-extrabold uppercase tracking-tighter px-8">
            <span>Armani Exchange</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
            <span>Rubaiyat Store</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
            <span>Jeddah Yacht Club</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
            <span>Premium Signage</span><span className="font-serif italic font-light opacity-40 text-3xl">✦</span>
          </div>
        </div>
      </section>
 
      {/* 6. Testimonials & Contact (Visual & Composition Overhaul) */}
      <section className="relative min-h-screen bg-light-surface dark:bg-dark-surface py-20 md:py-48 flex flex-col justify-between transition-colors duration-700">
        
        {/* Visual Testimonial Split spread */}
        <div className="container mx-auto px-6 mb-20 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest">[ Real Status Validations ]</span>
              <div className="overflow-hidden">
                <h3 className="reveal-mask text-4xl md:text-5xl font-serif italic font-light text-royal leading-tight mb-8">
                  "Their attention to detail and spatial branding execution is extraordinary."
                </h3>
              </div>
              <div>
                <p className="text-md font-syne font-extrabold uppercase tracking-widest text-stone-900 dark:text-white">Jeddah Yacht Club Representative</p>
                <p className="text-xs uppercase tracking-widest opacity-60 mt-1 text-stone-500 dark:text-white/60">Luxury Marine Asset & Marina Operations</p>
              </div>
              <div className="mt-8">
                <Link href="/testimonials" className="inline-block border-2 border-royal text-royal hover:bg-royal hover:text-white px-8 py-4 font-syne font-bold uppercase tracking-widest text-xs transition-all duration-300">
                  Read Luxury Chronicles
                </Link>
              </div>
            </div>
 
            <div className="lg:col-span-7 relative h-[50vh] w-full rounded-sm overflow-hidden border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark">
              <Image 
                src="/images/jeddah_yacht_club.webp" 
                alt="Jeddah Yacht Club Marine Signs" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-95 dark:opacity-80" 
                loading="lazy" 
              />
            </div>
 
          </div>
        </div>
 
        {/* Cinematic Contact Gateway */}
        <div id="contact" className="container mx-auto px-6 border-t border-light-border dark:border-white/10 pt-16 md:pt-32">
          
          <div className="overflow-hidden inline-block mb-16">
            <h2 className="reveal-mask text-[15vw] md:text-[10vw] leading-[0.8] font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">
              Let's <br />Build It.
            </h2>
          </div>
 
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mt-12">
            
            <div className="lg:col-span-7">
              <p className="text-lg md:text-3xl font-serif font-light text-stone-600 dark:text-white/60 mb-12 max-w-2xl leading-relaxed">
                Partner with Jeddah's premier branding and luxury print workshop to shape an enduring physical legacy.
              </p>
              <Link href="/contact" className="inline-block bg-royal text-white hover:bg-royal-hover px-10 py-5 font-syne font-bold uppercase tracking-widest text-xs transition-all duration-300 rounded-sm shadow-xl">
                Initiate Project Brief ✦
              </Link>
            </div>
 
            <div className="lg:col-span-5 flex flex-col gap-8 text-left lg:text-right text-stone-900 dark:text-white">
              <div>
                <span className="block text-[10px] font-syne font-bold uppercase tracking-widest text-stone-400 dark:text-white/40 mb-2">Corporate Headquarters</span>
                <a href="mailto:print@iconic-advertising.com" className="text-xl md:text-2xl font-syne font-bold hover:text-royal transition-colors block">print@iconic-advertising.com</a>
              </div>
              <div>
                <span className="block text-[10px] font-syne font-bold uppercase tracking-widest text-stone-400 dark:text-white/40 mb-2">Direct Liaisons</span>
                <a href="tel:+966508570135" className="text-xl md:text-2xl font-syne font-bold hover:text-royal transition-colors block mb-1">+966 50 857 0135</a>
                <a href="tel:+966504434890" className="text-xl md:text-2xl font-syne font-bold hover:text-royal transition-colors block">+966 50 443 4890</a>
              </div>
            </div>
 
          </div>
        </div>
 
      </section>
    </main>
  );
}

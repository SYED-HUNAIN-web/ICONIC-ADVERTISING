"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ 
    name: "", 
    company: "",
    email: "", 
    phone: "",
    service: "", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    // Simple Spam Protection / Honeypot could go here
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
        }, 6000);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative w-full bg-light-bg dark:bg-dark-bg transition-colors duration-700 pt-24 md:pt-32 pb-24 md:pb-48 overflow-hidden animate-fade-in" ref={containerRef}>
      <div className="container mx-auto px-6">
        
        {/* 1. Header */}
        <section className="relative min-h-[35vh] flex flex-col justify-center mb-10 md:mb-16 border-b border-light-border dark:border-dark-border pb-8 md:pb-16">
          <span className="text-royal text-xs font-syne font-bold uppercase tracking-widest mb-6 block">[ Contact Us ]</span>
          <div className="overflow-hidden mb-6">
            <h1 className="reveal-mask text-[8vw] leading-[0.85] font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white">
              Get In <br /><span className="font-serif italic font-light text-royal tracking-normal normal-case">Touch.</span>
            </h1>
          </div>
        </section>
 
        {/* 2. Interactive Split Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 border-t border-light-border dark:border-dark-border pt-12 md:pt-24">
          
          {/* Left Panel: Direct Channels & Visual Headquarters */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            {/* HQ Visual Showcase */}
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-light-border dark:border-dark-border shadow-luxury shadow-luxury-light dark:shadow-luxury-dark group">
              <Image 
                src="/images/luxury_storefront_facade.png" 
                alt="Luxury storefront facade" 
                fill 
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-95 dark:opacity-85"
                priority
              />
              <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute bottom-4 left-4 bg-royal text-white py-1 px-3 text-[9px] font-syne font-bold uppercase tracking-widest rounded-xs">
                Luxury Storefront Facade
              </div>
            </div>
 
            <div>
              <h2 className="text-2xl font-syne font-extrabold uppercase tracking-tighter mb-4 text-stone-900 dark:text-white">Call Us</h2>
              <p className="text-base text-stone-600 dark:text-white/60 font-light mb-8">
                Feel free to call or WhatsApp us. Our support team in Jeddah is ready to help you with your printing and advertising projects.
              </p>
              
              <div className="flex flex-col gap-6 font-syne font-bold uppercase tracking-wider text-xs">
                <div>
                  <span className="block text-[10px] text-stone-400 dark:text-white/40 mb-2 font-syne">[ Phone / WhatsApp ]</span>
                  <a href="tel:+966508570135" className="text-2xl font-extrabold text-royal hover:text-royal-hover block mb-2 transition-colors">+966 50 857 0135</a>
                  <a href="tel:+966504434890" className="text-2xl font-extrabold text-royal hover:text-royal-hover block transition-colors">+966 50 443 4890</a>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 dark:text-white/40 mb-2 font-syne">[ Email Us ]</span>
                  <a href="mailto:print@iconic-advertising.com" className="text-xl font-extrabold text-royal hover:text-royal-hover block transition-colors">print@iconic-advertising.com</a>
                </div>
              </div>
            </div>
 
            <div className="border-t border-light-border dark:border-dark-border pt-8 font-light text-stone-700 dark:text-white/70">
              <h3 className="text-lg font-syne font-bold uppercase tracking-tight mb-2 text-stone-900 dark:text-white">Our Address</h3>
              <p className="leading-relaxed">
                Jeddah,<br />
                Kingdom of Saudi Arabia
              </p>
            </div>
 
          </div>
 
          {/* Right Panel: Minimalist Luxury Form */}
          <div className="lg:col-span-7 text-stone-900 dark:text-white">
            <h2 className="text-3xl font-syne font-extrabold uppercase tracking-tighter mb-8">Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-royal/5 border border-royal p-8 text-royal font-syne font-bold uppercase tracking-widest text-center text-xs rounded-sm shadow-inner transition-opacity duration-500">
                ✦ Thank you. Your message has been sent. We will contact you shortly. ✦
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 font-syne font-semibold uppercase tracking-wider text-[10px] transition-opacity duration-500">
                
                {error && (
                  <div className="md:col-span-2 bg-red-500/10 border border-red-500 p-4 text-red-500 font-syne font-bold uppercase tracking-widest text-center text-[10px] rounded-sm">
                    Failed to send. Please check your connection or contact us directly.
                  </div>
                )}

                <div className="relative border border-light-border dark:border-white/10 bg-light-surface/40 dark:bg-dark-surface/40 focus-within:border-royal focus-within:bg-light-surface/90 dark:focus-within:bg-dark-surface/90 p-5 rounded-sm transition-all duration-300 shadow-sm focus-within:shadow-md">
                  <span className="block opacity-50 mb-2">Full Name</span>
                  <input 
                    type="text" 
                    required
                    disabled={isSubmitting}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. John Doe" 
                    className="w-full bg-transparent border-none outline-none text-sm placeholder-stone-400 dark:placeholder-white/30 text-stone-900 dark:text-white font-sans mt-1 capitalize disabled:opacity-50"
                  />
                </div>

                <div className="relative border border-light-border dark:border-white/10 bg-light-surface/40 dark:bg-dark-surface/40 focus-within:border-royal focus-within:bg-light-surface/90 dark:focus-within:bg-dark-surface/90 p-5 rounded-sm transition-all duration-300 shadow-sm focus-within:shadow-md">
                  <span className="block opacity-50 mb-2">Company Name</span>
                  <input 
                    type="text" 
                    disabled={isSubmitting}
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="e.g. Armani Exchange" 
                    className="w-full bg-transparent border-none outline-none text-sm placeholder-stone-400 dark:placeholder-white/30 text-stone-900 dark:text-white font-sans mt-1 capitalize disabled:opacity-50"
                  />
                </div>
 
                <div className="relative border border-light-border dark:border-white/10 bg-light-surface/40 dark:bg-dark-surface/40 focus-within:border-royal focus-within:bg-light-surface/90 dark:focus-within:bg-dark-surface/90 p-5 rounded-sm transition-all duration-300 shadow-sm focus-within:shadow-md">
                  <span className="block opacity-50 mb-2">Email Address</span>
                  <input 
                    type="email" 
                    required
                    disabled={isSubmitting}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. liaison@company.com" 
                    className="w-full bg-transparent border-none outline-none text-sm placeholder-stone-400 dark:placeholder-white/30 text-stone-900 dark:text-white font-sans mt-1 lowercase disabled:opacity-50"
                  />
                </div>

                <div className="relative border border-light-border dark:border-white/10 bg-light-surface/40 dark:bg-dark-surface/40 focus-within:border-royal focus-within:bg-light-surface/90 dark:focus-within:bg-dark-surface/90 p-5 rounded-sm transition-all duration-300 shadow-sm focus-within:shadow-md">
                  <span className="block opacity-50 mb-2">Phone Number</span>
                  <input 
                    type="tel" 
                    required
                    disabled={isSubmitting}
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="e.g. +966 50 XXX XXXX" 
                    className="w-full bg-transparent border-none outline-none text-sm placeholder-stone-400 dark:placeholder-white/30 text-stone-900 dark:text-white font-sans mt-1 disabled:opacity-50"
                  />
                </div>
 
                <div className="md:col-span-2 relative border border-light-border dark:border-white/10 bg-light-surface/40 dark:bg-dark-surface/40 focus-within:border-royal focus-within:bg-light-surface/90 dark:focus-within:bg-dark-surface/90 p-5 rounded-sm transition-all duration-300 shadow-sm focus-within:shadow-md">
                  <span className="block opacity-50 mb-2">Service Required</span>
                  <select 
                    required
                    disabled={isSubmitting}
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full bg-transparent border-none outline-none text-sm text-stone-900 dark:text-white font-sans mt-1 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="" disabled className="text-stone-400 dark:bg-dark-surface">Select a service</option>
                    <option value="Custom Printing & Packaging" className="dark:bg-dark-surface">Custom Printing & Packaging</option>
                    <option value="Corporate Folders & Books" className="dark:bg-dark-surface">Corporate Folders & Books</option>
                    <option value="Outdoor Billboards" className="dark:bg-dark-surface">Outdoor Billboards</option>
                    <option value="Storefronts & Signs" className="dark:bg-dark-surface">Storefronts & Signs</option>
                    <option value="Other Service" className="dark:bg-dark-surface">Other Service</option>
                  </select>
                </div>
 
                <div className="md:col-span-2 relative border border-light-border dark:border-white/10 bg-light-surface/40 dark:bg-dark-surface/40 focus-within:border-royal focus-within:bg-light-surface/90 dark:focus-within:bg-dark-surface/90 p-5 rounded-sm transition-all duration-300 shadow-sm focus-within:shadow-md">
                  <span className="block opacity-50 mb-2">Message</span>
                  <textarea 
                    rows={4}
                    required
                    disabled={isSubmitting}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your project, size requirements, or deadlines..." 
                    className="w-full bg-transparent border-none outline-none text-sm resize-none placeholder-stone-400 dark:placeholder-white/30 text-stone-900 dark:text-white font-sans mt-2 normal-case leading-relaxed disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2 mt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-royal hover:bg-royal-hover text-white px-12 py-5 font-syne font-bold uppercase tracking-widest text-xs transition-all duration-300 rounded-sm shadow-xl hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Message ✦"}
                  </button>
                </div>
 
              </form>
            )}
          </div>
 
        </div>
 
      </div>
    </main>
  );
}

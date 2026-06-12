"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/work", label: "Our Work" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    initial: { y: "-100%" },
    animate: { 
      y: 0, 
      transition: { 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1] as any
      } 
    },
    exit: { 
      y: "-100%", 
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1] as any
      } 
    }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.65, 
        ease: [0.16, 1, 0.3, 1] as any
      } 
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-light-bg/85 dark:bg-dark-bg/85 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04] transition-colors duration-500">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-50">
          
          {/* Logo Branding */}
          <div className="text-2xl font-syne font-extrabold tracking-widest uppercase relative z-50">
            <Link href="/" className="hover:opacity-85 transition-opacity">ICONIC</Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-syne font-bold tracking-widest uppercase">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`hover:text-royal transition-colors relative py-1 ${
                  pathname === link.href ? "text-royal dark:text-white" : "text-black/60 dark:text-white/60"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span 
                    layoutId="desktop-active-indicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-royal dark:bg-white" 
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Header Controls (ThemeToggle + Hamburger Trigger) */}
          <div className="flex items-center gap-4 md:gap-6 relative z-50">
            <ThemeToggle />

            {/* Hamburger Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden flex-col justify-center items-center w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 relative z-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px] w-4 justify-center items-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block w-full h-[1.5px] bg-black dark:bg-white origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-full h-[1.5px] bg-black dark:bg-white"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block w-full h-[1.5px] bg-black dark:bg-white origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 bg-light-bg/98 dark:bg-dark-bg/98 backdrop-blur-2xl flex flex-col justify-between pt-36 pb-12 px-8 overflow-y-auto"
          >
            {/* Top Spotlight Background Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-35 bg-[radial-gradient(circle_at_top,rgba(44,54,145,0.15)_0%,transparent_60%)]" />

            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-8 md:gap-12 relative z-10 my-auto"
            >
              {/* Responsive Staggered Links */}
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-royal dark:text-royal/80">[ Navigation Menu ]</span>
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={itemVariants} className="overflow-hidden">
                    <Link
                      href={link.href}
                      className={`text-[10vw] sm:text-[8vw] leading-[1.1] font-syne font-extrabold uppercase tracking-tighter block hover:text-royal transition-colors ${
                        pathname === link.href ? "text-royal dark:text-white" : "text-stone-900/40 dark:text-white/30"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Contact Coordinates inside Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-black/5 dark:border-white/5 pt-8 mt-12 relative z-10 text-[10px] font-syne font-bold uppercase tracking-widest"
            >
              <div className="flex flex-col gap-2">
                <span className="text-black/40 dark:text-white/40 block">[ Call Us ]</span>
                <a href="tel:+966508570135" className="text-black/80 dark:text-white/80 hover:text-royal transition-colors">+966 50 857 0135</a>
                <a href="tel:+966504434890" className="text-black/80 dark:text-white/80 hover:text-royal transition-colors">+966 50 443 4890</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-black/40 dark:text-white/40 block">[ Contact Info ]</span>
                <a href="mailto:print@iconic-advertising.com" className="text-black/80 dark:text-white/80 hover:text-royal transition-colors lowercase">print@iconic-advertising.com</a>
                <span className="text-black/60 dark:text-white/60 font-light font-sans normal-case block">Jeddah, Saudi Arabia</span>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

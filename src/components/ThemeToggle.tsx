"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-stone-200/90 dark:bg-stone-800/90 p-1 transition-colors duration-500 cursor-pointer flex items-center border border-black/[0.06] dark:border-white/[0.08] shadow-inner focus:outline-none z-[60]"
      aria-label="Toggle Dark Mode"
    >
      {/* Sun and Moon background icons inside track */}
      <div className="absolute inset-0 flex justify-between items-center px-2.5 pointer-events-none opacity-40">
        {/* Sun SVG on left */}
        <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
        {/* Moon SVG on right */}
        <svg className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>
      
      {/* Animated circular knob */}
      <motion.div
        className="w-6 h-6 rounded-full bg-white dark:bg-stone-900 shadow-md flex items-center justify-center relative z-10"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Knob active icon */}
        {isDark ? (
          <motion.svg 
            initial={{ rotate: -90, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </motion.svg>
        ) : (
          <motion.svg 
            initial={{ rotate: 90, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-3.5 h-3.5 text-amber-500" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </motion.svg>
        )}
      </motion.div>
    </button>
  );
}

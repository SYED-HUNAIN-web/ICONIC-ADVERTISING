"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Unlock scrolling after animation completes
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-light-bg dark:bg-dark-bg transition-colors duration-500"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="text-[12vw] md:text-[8vw] font-syne font-extrabold uppercase tracking-tighter text-stone-900 dark:text-white"
            >
              ICONIC
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

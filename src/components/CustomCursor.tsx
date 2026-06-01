"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP's optimized xPercent/yPercent for centering instead of CSS transform: translate(-50%, -50%)
    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50, 
      x: -100, 
      y: -100,
      force3D: true 
    });

    // Use GSAP quickTo for ultra-low latency mouse following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block will-change-transform"
    />
  );
}


"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function Scene({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { width } = useThree((state) => state.viewport);
  
  // Calculate dynamic responsive scale based on WebGL canvas viewport width
  const dynamicScale = Math.max(0.55, Math.min(width * 0.16, 1.05));

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[dynamicScale, dynamicScale, dynamicScale]}>
        {/* Sized down geometry to sit gracefully in background without visual competition */}
        <torusKnotGeometry args={[1.05, 0.28, 64, 16]} />
        {/* Crystal clear high-index glass transmission material */}
        <MeshTransmissionMaterial 
          thickness={isDark ? 0.6 : 0.4} 
          roughness={isDark ? 0.15 : 0.12} 
          transmission={isDark ? 1 : 0.98} 
          ior={isDark ? 1.4 : 1.65} 
          chromaticAberration={isDark ? 0.04 : 0.08} 
          backside={false} 
          color={isDark ? "#2c3691" : "#2c3691"}
          resolution={64}
          samples={4}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    // Observe theme toggles
    const themeObserver = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Dynamic Render Loop: Stop WebGL Canvas from drawing when out of view
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null, 
        rootMargin: "100px", 
        threshold: 0,
      }
    );

    const container = containerRef.current;
    if (container) {
      viewObserver.observe(container);
    }

    return () => {
      if (container) {
        viewObserver.unobserve(container);
      }
      viewObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 h-full w-full pointer-events-none will-change-transform transition-all duration-700 ${
        isDark ? "opacity-80 mix-blend-plus-lighter" : "opacity-95 mix-blend-normal"
      }`}
    >
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.2]} 
        frameloop={isInView ? "always" : "never"}
      >
        {/* Boosted illumination for crystal clear reflections in light mode */}
        <ambientLight intensity={isDark ? 0.5 : 1.2} />
        <directionalLight position={[10, 10, 10]} intensity={isDark ? 1.0 : 2.5} />
        <directionalLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 1.2} color={isDark ? "#2c3691" : "#2c3691"} />
        <Scene isDark={isDark} />
        <Environment preset="city" resolution={128} />
      </Canvas>
    </div>
  );
}

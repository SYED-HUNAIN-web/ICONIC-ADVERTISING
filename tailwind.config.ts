import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: "#2c3691",
          hover: "#1e266b",
        },
        dark: {
          bg: "#0a0a0a",
          surface: "#121212",
          border: "rgba(255,255,255,0.1)"
        },
        light: {
          bg: "#FAF8F5",
          surface: "#F4EFE6",
          accent: "#1A1917",
          border: "rgba(26,25,23,0.12)"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        syne: ["var(--font-jakarta)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#5A1E2D",
        forest: "#234B35",
        gold: "#C6A15B",
        ivory: "#F8F6F1",
        charcoal: "#1E1E1E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
        accent: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        premium: "0 30px 80px rgba(30, 30, 30, 0.10)",
        glow: "0 0 50px rgba(198, 161, 91, 0.20)",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #C6A15B, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;

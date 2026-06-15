import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F4C75",
          50: "#E8F0F8",
          100: "#C5D9EE",
          200: "#9EBDE0",
          300: "#6F9ECF",
          400: "#4B86C2",
          500: "#0F4C75",
          600: "#0D3F62",
          700: "#0A2F4A",
          800: "#081F32",
          900: "#04111C",
        },
        secondary: {
          DEFAULT: "#D35400",
          50: "#FFF3EB",
          100: "#FDE0CC",
          200: "#FBC299",
          300: "#F8A366",
          400: "#DF6A1A",
          500: "#D35400",
          600: "#B84600",
          700: "#9A3800",
          800: "#7B2B00",
          900: "#5C1E00",
        },
        accent: {
          DEFAULT: "#F4A261",
          50: "#FFF8F0",
          100: "#FFEED9",
          200: "#FFE0B8",
          300: "#F4A261",
          400: "#E88C3A",
          500: "#D97620",
          600: "#B85E14",
          700: "#94480C",
          800: "#703406",
          900: "#4C2202",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B1420",
          surface: "#121D2B",
          dark: "#0F1826",
        },
        border: {
          DEFAULT: "#1E2A3A",
        },
        brand: {
          blue: "#6EA8FE",
          "blue-gray": "#9FB3C8",
          green: "#22C77D",
          warm: "#FFA75E",
        },
        text: {
          primary: "#E8EEF4",
          secondary: "#A9B8C6",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

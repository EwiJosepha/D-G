import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#003866",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        // 'xs': { 'min': '320px', 'max': '425px' },
        // 'sm': { 'min': '640px', 'max': '767px' },
        // 'md': { 'min': '1024px', 'max': '1440px' },

        'xs': '425px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl': '1440px',
      },

      keyframes: {
        walk: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        walk: "walk 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
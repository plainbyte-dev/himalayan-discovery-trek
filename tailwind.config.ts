import type { Config } from "tailwindcss";

// "Glacier and saffron" palette. Usage rules:
// - Text on saffron is always navy. Saffron is never body text on light backgrounds (use saffron-text).
// - flag-red is reserved for offers/savings so they never compete with "Book now".
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0E2A47", 700: "#163A5F" },
        saffron: { DEFAULT: "#E9A23B", hover: "#D48E28", text: "#A05A12" },
        "flag-red": "#C8553D",
        glacier: { DEFAULT: "#E6F0F4", 300: "#9CC3D5" },
        snow: "#FAF7F2",
        ink: "#1E293B",
        slate: "#475569",
        muted: "#64748B",
        line: "#E2DDD4",
        success: "#2F7D5B",
        tripadvisor: "#00AA6C",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "cursive"],
        script: ["var(--font-script)", "cursive"],
      },
      letterSpacing: {
        eyebrow: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;

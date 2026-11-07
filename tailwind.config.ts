import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1E6FD9", dark: "#1759B0" },
        navy: "#0B2A5B",
        accent: { DEFAULT: "#F5C518", dark: "#DDB012", deep: "#9A7400" },
        ink: "#1F2937",
        mist: "#F3F4F6",
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

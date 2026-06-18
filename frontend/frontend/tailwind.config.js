/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00d4ff",
        secondary: "#a78bfa",
        success: "#34d399",
        warning: "#fbbf24",
        danger: "#f87171",
        dark: {
          50: "#1a2235",
          100: "#141c2b",
          200: "#0d111a",
          300: "#0a0e18",
          400: "#07090f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.35), 0 0 60px rgba(0, 212, 255, 0.12)",
        "glow-purple": "0 0 20px rgba(167, 139, 250, 0.35), 0 0 60px rgba(167, 139, 250, 0.12)",
        "glow-green": "0 0 20px rgba(52, 211, 153, 0.35)",
        "glow-red": "0 0 20px rgba(248, 113, 113, 0.35)",
        "glow-amber": "0 0 20px rgba(251, 191, 36, 0.35)",
        "card": "0 4px 32px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(0, 212, 255, 0.8), 0 0 50px rgba(0, 212, 255, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};

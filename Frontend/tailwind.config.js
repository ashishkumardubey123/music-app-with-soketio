/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        cardReveal: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%":      { opacity: "0.55", transform: "scale(1.06)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "gradient-shift":    "gradientShift 14s ease infinite",
        "card-reveal":       "cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "shimmer":           "shimmer 4s linear infinite",
        "glow-pulse":        "glowPulse 6s ease-in-out infinite",
        "glow-pulse-slow":   "glowPulse 8s ease-in-out infinite 2s",
        "glow-pulse-slower": "glowPulse 10s ease-in-out infinite 4s",
        "fade-up":           "fadeUp 0.5s ease 0.3s both",
        "fade-up-delay":     "fadeUp 0.5s ease 0.45s both",
      },
    },
  },
  plugins: [],
}



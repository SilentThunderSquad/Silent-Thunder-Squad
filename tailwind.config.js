/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ['"Inter"', "sans-serif"]
      },
      colors: {
        background: "#050507",
        foreground: "#f5f7ff",
        card: "#0c0d14",
        border: "rgba(255,255,255,0.12)",
        ring: "#68d5ff"
      },
      boxShadow: {
        glow: "0 0 40px rgba(80, 184, 255, 0.22)"
      }
    }
  },
  plugins: []
};

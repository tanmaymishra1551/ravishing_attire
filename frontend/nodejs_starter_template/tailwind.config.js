module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B", // You can keep your primary color as it is.
        secondary: "#FFD93D",
        accent: "#6BCB77",
        lightPink: "#F8C8D1", // Light Pink for gradients
        softPink: "#F2A7C4",  // Soft Pink for gradients
        darkPink: "#D13D6E",  // Dark Pink for gradients
        palePink: "#F9E3E3",  // Pale Pink for gradients
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        tangerine: ['Tangerine', 'serif'],
      },
    },
  },
  plugins: [],
};

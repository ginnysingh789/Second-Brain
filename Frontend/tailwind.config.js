/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#4e47e4", // Dark
          500: "#9594de", // Light
          400: "#dfe8fe" // Lighter
        }
      }
    },
  },
  plugins: [],
}


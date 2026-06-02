/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D9E75",
        dark: "#085041",
        blue: "#185FA5",
        amber: "#EF9F27",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
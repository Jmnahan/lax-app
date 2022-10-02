/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        backdrop: "rgba(0,0,0,0.7)"
      },
      height: {
        "85": "85vh",
        "84": "84vh",
        "14": "14vh"
      },
    },
  },
  plugins: [],
}

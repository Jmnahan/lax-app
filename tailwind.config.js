/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        backdrop: "rgba(0,0,0,0.7)"
      },
      height: {
        "84": "84vh",
        "30": "30vh"
      },
      maxHeight: {
        "80": "80vh",
      },
      minHeight: {
        "80": "80%",
      }
    },
  },
  plugins: [],
}

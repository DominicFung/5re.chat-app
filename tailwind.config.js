/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: { center: true },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  safelist: [
    "max-w-md", "max-w-lg", "text-left", "flex-1", "flex-row", "flex"
  ]
}

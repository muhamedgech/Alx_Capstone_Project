/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {colors: {
      'custom-gray': '#e0e0e0', // Or any color you prefer
      'custom-blue': '#3498db', // Example of adding another custom color
      'custom-dark-gray': '#333333',
    },},
  },
  plugins: [],
}

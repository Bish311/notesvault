/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', // indigo-600
          dark: '#6366f1', // indigo-500 for dark mode
        }
      }
    },
  },
  plugins: [],
}

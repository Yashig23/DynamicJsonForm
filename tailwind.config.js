/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#121212', 
        darkText: '#E0E0E0', 
        lightBg: '#FFFFFF', 
        lightText: '#000000',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}



/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'organic-yellow': '#FFD700',
          'organic-orange': '#FF6B4A',
        },
        fontFamily: {
          sans: ['Google Sans', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
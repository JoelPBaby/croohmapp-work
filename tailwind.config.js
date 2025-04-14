/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'organic-yellow': '#FFD700',
          'organic-orange': '#FF6B4A',
        },
      },
    },
    plugins: [],
  }
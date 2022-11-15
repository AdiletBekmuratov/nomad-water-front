/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#023646",
        "light-blue":"#EBF3F6",
      }
    },

  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,ts,html}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        main: '#9D9DAB',
        'dark-blue': '#023646',
        'light-blue': '#EBF3F6'
      },
      backgroundImage: {
        astana: "url('./src/assets/astanaHub.png')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

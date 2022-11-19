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
        'dark-blue': '#023646',
        'medium-blue': '#5a8c9a',
        'light-blue': '#EBF3F6',
        'footer-color': '#232B2E',
        main: '#9D9DAB',
        'dark-blue': '#023646',
        'light-blue': '#EBF3F6',
        primary: '#00034E'
      },
      backgroundImage: {
        astana: "url('./src/assets/astanaHub.png')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

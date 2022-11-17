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
        "dark-blue": "#023646",
        "medium-blue": "#54B8F0",
        "light-blue": "#EBF3F6",
        "footer-color": "#232B2E",
        main: '#9D9DAB',}
        ,
        backgroundImage: {
          astana: "url('./src/assets/astanaHub.png')"
        }
      }
    },
    plugins: [require('@tailwindcss/forms')]
  };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./views/**/*.hbs"
  ],
  theme: {
    colors: {
      'grey': '#2C343F',
      'grey-dark': '#202227',
      'grey-light': '#777777',
      'white': '#FFFFFF',
      'silver': '#C0C0C0',
      'green': '#008000',
      'black': '#000000',
    },
    spacing: {
      '0': '0px',
      '10': '10px',
      '20': '20px',
      '80': '80px',
      '100': '100px',
      '200': '200px',
      '900': '900px',
    },
    extend: {},
  },
  plugins: [],
}
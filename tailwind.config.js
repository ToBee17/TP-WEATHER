/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mont': ['Manrope', 'sans-serif'],
      },
      
      colors: {

        'background': '#B8DAEB',
        'dark-blue': '#001A33',
        'grey' : '#D7E1F4',

        'midi': '#F5CF6A',
        'matin': '#ECB770',
        'soir': '#EC9570',
        'nuit': '#6FB6DA',
      },
    },
  },
  plugins: [],
}
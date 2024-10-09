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
        'background': "hsl(var(--bg-all)/ <alpha-value>)",
        'text': "hsl(var(--text-all)/ <alpha-value>)",
        'text-light': "hsl(var(--green)/ <alpha-value>)",
        'bg-card': "hsl(var(--bg-card)/ <alpha-value>)",
        'blue-color': "hsl(var(--blue)/ <alpha-value>)",
      },
    },
  },
  plugins: [],
}
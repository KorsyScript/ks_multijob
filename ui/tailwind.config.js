/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'chinese_rocks': ['chinese_rocks', 'serif'],
        'rdrlino': ['rdrlino', 'serif']

      },
      colors: {
        primary: '#841c20',
      },
    },
  },
  plugins: [],
}

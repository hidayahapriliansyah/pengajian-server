/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ejs}'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

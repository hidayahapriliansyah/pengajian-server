/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ejs}'],
  theme: {
    colors: {
      rose: '#dd3f4c',
      midnight: '#1e3e72',
    }
  },
  plugins: [require('flowbite/plugin')],
}

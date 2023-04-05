/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue}'],
  theme: {
    extend: {
      spacing: {
        '1080px': '1080px'
      },
      colors: {
        'peta-blue': '#009fe3'
      }
    }
  },
  plugins: []
}

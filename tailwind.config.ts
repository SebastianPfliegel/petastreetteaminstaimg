import type { Config } from 'tailwindcss'
import * as defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{ts,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        '1080px': '1080px',
        '1350px': '1350px'
      },
      colors: {
        'peta-blue': '#009fe3'
      }
    }
  },
  plugins: []
} satisfies Config

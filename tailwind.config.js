/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: { DEFAULT: '#C8FF00', dark: '#3a4a00' },
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
        display: ['Barlow Condensed', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}



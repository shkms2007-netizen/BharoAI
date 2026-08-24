/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF5EC',
          100: '#FFE8D5',
          200: '#FFD0AB',
          300: '#FFB277',
          400: '#FF9544',
          500: '#FF6B1A',
          600: '#E55510',
          700: '#BF440C',
          800: '#99370B',
          900: '#7A2E0A',
        },
        ashok: {
          500: '#138808',
          600: '#0F7006',
          700: '#0C5805',
        },
      },
      fontFamily: {
        sans: ['Hind', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tfc: {
          black: '#0A0A0A',
          onyx: '#111111',
          surface: '#181818',
          card: '#1F1F1F',
          border: '#2E2E2E',
          cream: '#F8F6F0',
          'cream-soft': '#FAF8F5',
          'cream-dark': '#EFECE6',
          beige: '#E3DCB',
          gold: '#D4AF37',
          'gold-light': '#F5DF88',
          'gold-dark': '#B8860B',
          amber: '#E5A93C',
          'amber-hover': '#D99827',
          muted: '#8A8A8A',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        serif: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
      letterSpacing: {
        'luxury': '0.2em',
        'ultra': '0.3em',
      }
    },
  },
  plugins: [],
}

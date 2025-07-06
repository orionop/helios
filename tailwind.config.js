/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        spaceblue: '#1E3A8A',
        cosmicpurple: '#7C3AED',
        solarorange: '#F97316',
        stellarwhite: '#FFFFFF',
        isrosaffron: '#ff9934',
        isroteal: '#4aa564',
        isrodeepblue: '#0b3d91',
        isrogradient1: '#1E3A8A',
        isrogradient2: '#ff9934',
        isrogradient3: '#4aa564',
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(30, 58, 138, 0.08)',
      },
      borderRadius: {
        card: '1rem',
      },
    },
  },
  plugins: [],
};

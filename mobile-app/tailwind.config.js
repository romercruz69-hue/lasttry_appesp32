/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#070B14',
      },
      boxShadow: {
        neon: '0 0 12px rgba(34,211,238,0.45)',
      },
    },
  },
  plugins: [],
};

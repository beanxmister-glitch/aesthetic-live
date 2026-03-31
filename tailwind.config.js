/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7f5',
          100: '#f5ebe8',
          200: '#e8d5cd',
          300: '#d4b8a8',
          400: '#c49883',
          500: '#b87d63', // Warm terracotta
          600: '#a35f4a',
          700: '#864a3b',
          800: '#6c3c30',
          900: '#553028',
        },
        accent: {
          gold: '#c9a66b',
          cream: '#f5f0e8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
const nextConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0D1117', // Deep dark blue, almost black
        'surface': '#161B22',    // The color of cards and surfaces
        'primary': '#8A53FF',    // A slightly softer Solana Purple
        'secondary': '#00FFA3', // Solana Green
        'border': '#30363d',     // A subtle border color
        'text-primary': '#c9d1d9', // Light gray for primary text
        'text-secondary': '#8b949e', // Darker gray for secondary text
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

module.exports = nextConfig;


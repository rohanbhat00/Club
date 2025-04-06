module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-black': '#0A0A0A',
        'night-dark': '#121212',
        'night-navy': '#0F1A2A',
        'neon-pink': '#FF2D95',
        'neon-blue': '#00F0FF',
        'neon-purple': '#9D4EDD',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}; 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#34d399',     // Hijau soft
        secondary: '#38bdf8',   // Biru muda
        bgLight: '#ecfdf5',     // Background hijau muda
        bgDark: '#0f172a',      // Background gelap
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 16px rgba(52, 211, 153, 0.25)',
        inner: 'inset 0 1px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};

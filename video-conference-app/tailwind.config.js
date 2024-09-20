/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF7F50',
        secondary: '#FFA07A',
        tertiary: '#FFD700',
        accent: '#FF4500',
        background: '#FFF5EE',
        text: '#333333',
      },
    },
  },
  plugins: [],
}

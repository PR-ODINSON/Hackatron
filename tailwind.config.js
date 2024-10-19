/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'customGradient1': 'linear-gradient(135deg, rgba(187,216,216,1) 0%, rgba(136,199,201,1) 100%)',
      },
    },
  },
  variants: {},
  plugins: [],
}
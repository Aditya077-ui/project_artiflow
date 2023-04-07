/** @type {import('tailwindcss').Config} */
module.exports = {
   content:[
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx}",
    "./Animations/**/*.{js,ts,jsx}",
    "./Data/**/*.{js,ts,jsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      colors: {
        brandBlue: '#4338CA',
      },
      // backgroundImage: (theme) => ({
      //   hero: "url('public/Assets/hero.png')",
      //   hexagon: "url('public/Assets/hexagon.png')",
      // }),
    },
  },
  plugins: [],
}
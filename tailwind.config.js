module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
       'open-sans': ['Open Sans', 'sans-serif'],
       'voces': ['Voces', 'serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        gridTemplateColumns: {
            'todo': 'repeat(4, 1fr) max-content'
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

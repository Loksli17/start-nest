module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        gridTemplateColumns: {
            'todo'     : 'repeat(4, 1fr) max-content',
            'chat-wrap': '350px auto',

            'chat-current-room-wrap': 'max-content 1fr max-content',
            'chat-room-user'        : '1fr max-content',
        },
        minWidth: {
            'modal': '600px',
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        gridTemplateColumns: {
            'todo'     : 'repeat(4, 1fr) max-content',
            'chat-wrap': '350px auto',

            'chat-current-room-wrap': '80px max-content 1fr max-content',
            'chat-room-user'        : '1fr max-content',
        },
        minWidth: {
            'modal': '600px',
        },
        maxWidth: {
            'modal': '1000px',
        },
        maxHeight: {
            'modal': '800px',
            'rooms': '670px',
        },
        gridTemplateRows: {
            'chat-page-wrap'   : 'max-content max-content 1fr',
            'chat-section-wrap': 'max-content minmax(320px, 480px) 50px',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}

const formKitTailwind = require('@formkit/themes/tailwindcss');

module.exports = {
  content: [
      "./formkit.config.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    formKitTailwind
  ],
}

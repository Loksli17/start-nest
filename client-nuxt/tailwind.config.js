const formKitTailwind = require('@formkit/themes/tailwindcss');

module.exports = {
  content: [
      "formkit.config.js",
      "components/**/*.{vue,js}",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "composables/**/*.{js,ts}",
      "plugins/**/*.{js,ts}",
      "app.{js,ts,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    formKitTailwind
  ],
  mode: "jit"
}

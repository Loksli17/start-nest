import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    typescript: {
        strict:    true,
        typeCheck: true
    },
    buildModules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss"
    ],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        config: {},
        injectPosition: 0,
        viewer: true,
    }
})

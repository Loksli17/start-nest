import { defineNuxtConfig } from 'nuxt'
import axios                from 'axios';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        '@pinia/nuxt'
    ],
    provide: {
        axios: () => {
            return axios.create({});
        }
    }
});

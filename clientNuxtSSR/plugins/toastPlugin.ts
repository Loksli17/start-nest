import VueToast, { ToastPluginApi } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default defineNuxtPlugin(nuxtApp => {
    if (process.client) {
        nuxtApp.vueApp.use(VueToast);

        return {
            provide: {
                toast: nuxtApp.vueApp.config.globalProperties.$toast as ToastPluginApi
            }
        }
    }
});
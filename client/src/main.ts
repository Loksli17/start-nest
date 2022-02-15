import { createApp, ref }           from 'vue';
import App                          from './App.vue';
import router                       from './router';
import VueToast, { ToastPluginApi } from 'vue-toast-notification';

import './assets/css/input.css';
import 'vue-toast-notification/dist/theme-sugar.css';


declare module '@vue/runtime-core'{
    interface ComponentCustomProperties{
        $Toast: typeof VueToast;
    }
}


const app = createApp(App);

app.use(VueToast, {position: 'bottom-right', duration: 6000}, ref);
app.use(router).mount('#app');


app.provide('Toast', app.config.globalProperties.$toast)

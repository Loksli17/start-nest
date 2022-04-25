import { createApp, ref }    from 'vue';
import App                   from './App.vue';
import router                from './router';
import VueToast              from 'vue-toast-notification';
import { createPinia }       from 'pinia';
import axios                 from './axios';
import { useTokenStore }     from './store/token';

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
app.use(createPinia());


app.provide('Toast', app.config.globalProperties.$toast);
axios(useTokenStore());

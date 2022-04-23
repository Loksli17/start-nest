<template>

    <div class="fixed z-10 h-16 grid grid-cols-2 px-10 items-center bg-blue-200 w-full opacity-90" id="nav">
        
        <div class="grid grid-flow-col auto-cols-max gap-5">
            <router-link class="text-gray-800 text-xl hover:underline" v-for="link in links" :key="link.to" :to="link.to">{{link.text}}</router-link>
        </div>
        
        <div class="grid justify-end auto-cols-max">
            <button class=" bg-indigo-600 text-white p-3" @click="toggle = true">Auth</button>
        </div>
    </div>

    <div v-if="toggle" class="fixed top-0 right-0 h-screen w-full z-50 grid grid-cols-2">
        <div class=" bg-black opacity-70" @click="toggle = false"></div>
        
        <div class=" bg-white grid justify-center content-center auto-rows-max gap-16">
            <h1 class="text-6xl font-bold">Auth</h1>

            <auth-form></auth-form>
        </div>
    </div>

    <div class="md:h-full md:grid gap-8 bg-white">
        <router-view/>
    </div>

</template>



<script lang="ts">
    

    import { defineComponent, Ref, ref, watch, inject } from 'vue';
    import { ToastPluginApi }                           from 'vue-toast-notification';
    import AuthForm                                     from './components/AuthForm.vue';


    export default defineComponent({

        components: {
            AuthForm
        },
        
        setup(){

            let toggle: Ref<boolean> = ref(false);

            const links: Ref<Array<{to: string, text: string}>> = ref([
                {to: "/",        text: 'Todolist'},
                {to: "/about",   text: 'About'},
                {to: "/article", text: 'Article'},
                {to: "/chat",    text: 'Chat'},
            ]);

            watch(toggle, (value: boolean) => {
                document.body.style.overflowY = (value) ? "hidden" : "auto";
            });

            // const sendLoginData = (e: Event) => {
            //     e.stopPropagation();
            //     e.preventDefault();

            //     axios.post(`http://${basicUrl}/auth/login`, {password: password.value, login: login.value}).then((response: AxiosResponse) => {
            //         if(response.data.error != undefined) {
            //             // Toast.error(response.data.error);
            //         }
            //     });
            // };

            return {
                links,
                toggle,

                // sendLoginData
            }
        }
    })
</script>

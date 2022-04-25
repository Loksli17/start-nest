<template>
    <div class="fixed z-10 h-16 grid grid-cols-2 px-10 items-center bg-blue-200 w-full opacity-90" id="nav">
        
        <div class="grid grid-flow-col auto-cols-max gap-5">
            <router-link class="text-gray-800 text-xl hover:underline" v-for="link in links" :key="link.to" :to="link.to">{{link.text}}</router-link>
        </div>
        
        <div class="grid justify-end auto-cols-max">
            <button class=" bg-indigo-600 text-white p-3"  @click="toggle = true">Auth</button>
            <!-- <div v-else>User []</div> -->
        </div>
    </div>

    <div v-if="toggle" class="fixed top-0 right-0 h-screen w-full z-50 grid grid-cols-2">
        <div class=" bg-black opacity-70" @click="toggle = false"></div>
        
        <div class=" bg-white grid justify-center content-center auto-rows-max gap-16">
            <h1 class="text-6xl font-bold">Auth</h1>

            <auth-form></auth-form>
        </div>
    </div>
</template>


<script lang="ts">

    import { defineComponent, Ref, ref, watch } from 'vue';
    import { useUserLoginStore } from '../store/userLogin';
    import { useTokenStore }                    from './../store/token';
    import AuthForm                             from './AuthForm.vue';


    export default defineComponent({

        components: {
            AuthForm,
        },
        
        setup(){

            // const store = useTokenStore();
            // const token = store.accessToken;
            
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

            return {
                links,
                toggle,
                // token
            }
        }
    })
</script>
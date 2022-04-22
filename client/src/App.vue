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

            <form class="grid gap-6" @submit="sendLoginData">
                <div class="">
                    <h3>Login</h3>
                    <input class="border-2 w-72 mt-2 p-2" name="login" type="text" v-model="login" placeholder="login">
                </div>

                <div>
                    <h3>Password</h3>
                    <input class="border-2 w-72 mt-2 p-2" name="pass" type="password" v-model="password" placeholder="password">
                </div>

                <div>
                    <input class=" p-3 hover:bg-indigo-600 hover:text-white cursor-pointer" type="submit" value="Login">
                </div>
            </form>
        </div>
    </div>

    <div class="md:h-full md:grid gap-8 bg-white">
        <router-view/>
    </div>

</template>



<script lang="ts">
    
    import axios, { AxiosResponse } from 'axios';
    import { defineComponent, Ref, ref, watch } from 'vue';


    export default defineComponent({
        
        setup(){

            const basicUrl = "127.0.0.1:3000";

            let 
                login   : Ref<string>  = ref(""),
                password: Ref<string>  = ref(""),
                toggle  : Ref<boolean> = ref(false);

            const links: Ref<Array<{to: string, text: string}>> = ref([
                {to: "/",        text: 'Todolist'},
                {to: "/about",   text: 'About'},
                {to: "/article", text: 'Article'},
                {to: "/chat",    text: 'Chat'},
            ]);

            watch(toggle, (value: boolean) => {
                document.body.style.overflowY = (value) ? "hidden" : "auto";
            });

            const sendLoginData = (e: Event) => {
                e.stopPropagation();
                e.preventDefault();

                axios.post(`http://${basicUrl}/auth/login`, {password: password, login: login}).then((response: AxiosResponse) => {
                    console.log(response);
                });
            };

            return {
                links,
                toggle,

                login,
                password,

                sendLoginData
            }
        }
    })
</script>

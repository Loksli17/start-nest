<template>
    <div>

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
</template>


<script lang="ts">

    import { defineComponent, inject, Ref, ref } from 'vue';
    import axios, { AxiosResponse }              from 'axios';
    import { ToastPluginApi }                    from 'vue-toast-notification';
    import { useTokenStore }                     from './../store/token';
    import { useUserStore }                 from '../store/user';


    export default defineComponent({
        
        setup(){

            const
                loginStore            = useUserStore(),
                store                 = useTokenStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi, 
                basicUrl              = "127.0.0.1:3000";

            let
                login   : Ref<string> = ref(""),
                password: Ref<string> = ref("");


            const sendLoginData = (e: Event) => {
                e.stopPropagation();
                e.preventDefault();

                axios.post(`http://${basicUrl}/auth/login`, {password: password.value, login: login.value}, {withCredentials: true})
                .then((response: AxiosResponse) => {
                    if(response != undefined){
                        Toast.success('Success auth');
                        store.edit(response.data.accessToken);
                        loginStore.edit(login.value, response.data.userId);
                    } else {
                        Toast.warning('Login or password is not correct!');
                    }
                })
                .catch((reason) => {
                    Toast.error('Server error');
                })
            };

            return {
                sendLoginData,

                password,
                login,
            }
        }
    })
</script>


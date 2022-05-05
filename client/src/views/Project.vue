
<template>
    
    <div v-if="accessToken == ''" class=" pt-24 pb-14">
        <h1 class=" text-2xl font-bold">You are not authorized. You should do it before drawing! </h1>
    </div>

    <div v-else class=" pt-24 pb-14 h-screen box-border grid grid-rows-chat-page-wrap">

        <div class="px-10 grid grid-flow-col auto-cols-max gap-8 items-center">
            <h1 class=" text-5xl font-bold">Projects</h1>
            <span class="text-3xl text-blue-500">[ {{login}} ]</span>
        </div>

        <div class="mt-6 px-10 ">
            <button class="p-4 w-max bg-blue-500  text-white text-lg rounded" @click="newModalToggle = true">Create project</button>
        </div>
    </div>

    <div @click.self="newModalToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 bg-opacity-80 top-0 left-0" :class="{'hidden': !newModalToggle}">
            
        <form class=" bg-white p-8 grid gap-10 opacity-100 rounded">
            <input class="cursor-pointer border-2 border-gray-600 p-3" type="text" name="name" v-model="name" placeholder="write project name here..">
            <input class=" p-4 bg-blue-500 text-white cursor-pointer rounded" type="submit" @click.prevent="sendProject" value="Create project">
        </form>
    </div>

</template>


<script lang="ts">
    import axios, { AxiosResponse }              from 'axios';
    import { computed, defineComponent, inject, nextTick, Ref, ref } from 'vue';
    import { ToastPluginApi }                    from 'vue-toast-notification';

    import { useUserStore }  from '../store/user';
    import { useTokenStore } from './../store/token';


    export default defineComponent({
        
        setup() {

            const
                basicUrl              = "http://127.0.0.1:3000",
                storeToken            = useTokenStore(),
                storeUser             = useUserStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            const 
                sendProject = () => {

                    axios.put(`${basicUrl}/project/add`, 
                        {
                            name: name.value, 
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${storeToken.accessToken}`
                            },
                            withCredentials: true,
                        }
                    ).then((response: AxiosResponse) => {
                        console.log(response);
                    })
                };
        

            let 
                name          : Ref<string>  = ref(""),
                newModalToggle: Ref<boolean> = ref(false);


            return {
                name,
                newModalToggle,

                sendProject,

                login: storeUser.user.login,
            }
        },
    })
</script>

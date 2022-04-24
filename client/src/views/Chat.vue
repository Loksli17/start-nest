<template>
    <div class=" pt-24 pb-14">

        <div class="px-10">
            <h1 class=" text-5xl font-bold">Chat</h1>
        </div>

        <div class="mt-6 px-10">
            <button class="p-4 w-max bg-blue-500  text-white text-lg" @click="showNewModal()">Create room</button>
        </div>


        <div @click.self="modalToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 opacity-90 top-0 left-0" :class="{'hidden': !modalToggle}">
            
            <form class=" bg-white p-8 grid gap-10 opacity-100">
                <input class="cursor-pointer border-2 border-gray-600 p-3" type="text" name="name" v-model="name">
                <input class=" p-4 bg-blue-500 text-white cursor-pointer" type="submit" @click.prevent="sendRoom" value="Create room">
            </form>

        </div>
    </div>
</template>

<script lang="ts">
    import axios, { AxiosResponse }              from 'axios';
    import { defineComponent, inject, Ref, ref } from 'vue';
    import { ToastPluginApi }                    from 'vue-toast-notification';
    import { useTokenStore }                     from './../store/token';


    export default defineComponent({
        
        setup(){
            
            const
                basicUrl              = "127.0.0.1:3000",
                store                 = useTokenStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            let
                name       : Ref<string>  = ref(''),
                modalToggle: Ref<boolean> = ref(false);


            const 

                showNewModal = () => {
                    modalToggle.value = true;
                },

                sendRoom = () => {
                    axios.put(`http://${basicUrl}/chat/create-room`, {name: name.value}, {
                        headers: {
                            Authorization: `Bearer ${store.accessToken}`
                        }
                    }).then((response: AxiosResponse) => {
                        console.log(response);
                    })
                };


            axios.post(`http://${basicUrl}/auth/check-token`, {}, {
                headers: {
                    Authorization: `Bearer ${store.accessToken}`
                }
            }).then((response: AxiosResponse) => {
                console.log(response);
            });

            console.log(store.accessToken);
            
            // Toast.success("ZAZAZA");

            return {
                modalToggle,
                name,

                showNewModal,
                sendRoom,
            }
        }
    })
</script>



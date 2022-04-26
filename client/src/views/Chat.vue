<template>

    <div v-if="accessToken == ''" class=" pt-24 pb-14">
        <h1 class=" text-2xl font-bold">You are not authorized. You should do it before chating! </h1>
    </div>

    <div v-else class=" pt-24 pb-14">

        <div class="px-10 grid grid-flow-col auto-cols-max gap-8 items-center">
            <h1 class=" text-5xl font-bold">Chat</h1>
            <span class="text-3xl text-blue-500">[ {{login}} ]</span>
        </div>

        <div class="mt-6 px-10">
            <button class="p-4 w-max bg-blue-500  text-white text-lg" @click="showNewModal()">Create room</button>
        </div>

        <div class="mt-6 px-10">
            <div class="grid grid-cols-chat-wrap gap-8">
                <div class="grid gap-4 grid-flow-col auto-cols-max" v-for="room in rooms" :key="room.id">
                    <div>

                    </div>
                    <div class="grid">
                        <div>
                            {{room.name}}
                        </div>
                        <div>
                            Last message..
                        </div>
                    </div>
                </div>
            </div>
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
    import { useUserStore }                      from '../store/user';
    import { useTokenStore }                     from './../store/token';


    export default defineComponent({
        
        setup(){
            
            const
                basicUrl              = "127.0.0.1:3000",
                storeToken            = useTokenStore(),
                storeUser             = useUserStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            let
                rooms      : Ref<Array<Record<string, any>>> = ref([]),
                name       : Ref<string>                     = ref(''),
                modalToggle: Ref<boolean>                    = ref(false);
            

            const 

                showNewModal = () => {
                    modalToggle.value = true;
                },

                sendRoom = () => {
                    axios.put(`http://${basicUrl}/chat/create-room`, {name: name.value}, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        Toast.success(`${response.data.room.name} was created successfully!`);
                        rooms.value.push(response.data.room);
                    })
                };
            
            // Toast.success("ZAZAZA");

            return {
                modalToggle,
                name,

                rooms,

                showNewModal,
                sendRoom,

                accessToken: storeToken.accessToken,
                login      : storeUser.user.login,
            }
        }
    })
</script>



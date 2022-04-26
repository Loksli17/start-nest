<template>

    <div v-if="accessToken == ''" class=" pt-24 pb-14">
        <h1 class=" text-2xl font-bold">You are not authorized. You should do it before chating! </h1>
    </div>

    <div v-else class=" pt-24 pb-14 h-screen box-border">

        <div class="px-10 grid grid-flow-col auto-cols-max gap-8 items-center">
            <h1 class=" text-5xl font-bold">Chat</h1>
            <span class="text-3xl text-blue-500">[ {{login}} ]</span>
        </div>

        <div class="mt-6 px-10">
            <button class="p-4 w-max bg-blue-500  text-white text-lg rounded" @click="showNewModal()">Create room</button>
        </div>

        <div class="mt-10 px-10">
            <div class="grid grid-cols-chat-wrap gap-6">
                
                <div class="grid gap-6">
                    <div class="grid gap-4 grid-flow-col auto-cols-max cursor-pointer bg-gray-100 hover:bg-red-100 rounded" v-for="(room, index) in rooms" :key="room.id" :class="{'bg-green-100': room.current}" @click="getMessages(room, index)">
                        <div class=" bg-cover w-20 rounded-l" :style="{ backgroundImage: `url(http://localhost:3000/room-img/${room.img})` }">

                        </div>
                        <div class="grid p-4">
                            <div>
                                {{room.name}}
                            </div>
                            <div v-if="room.messages.length > 0">
                                [{{room.messages[0].user.login}}]: {{room.messages[0].content}}
                            </div>
                            <div v-else>
                                {NO MESSAGES}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div v-if="roomActInd != -1" class=" p-4 bg-blue-200 rounded grid grid-flow-col items-center">
                        <div class="text-2xl">{{rooms[roomActInd].name}}</div>

                        <div v-if="rooms[roomActInd].user.login == login">
                            <button class=" bg-white rounded p-3">Settings</button>
                        </div>
                    </div>

                    <div v-if="(messages.length > 0) && roomActInd != -1" class="grid gap-3 mt-7">
                        <div v-for="message in messages" :key="message" class=" bg-gray-200 p-3 rounded">
                            <div>
                                {{message.user.login}} [ {{message.date}}  {{message.time}}] - {{message.content}}
                            </div>
                        </div>
                    </div>

                    <div class=" text-xl mt-7" v-else-if="roomActInd != -1">
                        NO MESSANGES IN THIS CHAT
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
                roomActInd : Ref<number>                     = ref(-1),
                rooms      : Ref<Array<Record<string, any>>> = ref([]),
                messages   : Ref<Array<Record<string, any>>> = ref([]),
                name       : Ref<string>                     = ref(''),
                modalToggle: Ref<boolean>                    = ref(false);
            

            const 

                showNewModal = () => {
                    modalToggle.value = true;
                },

                sendRoom = () => {
                    axios.put(`http://${basicUrl}/chat/create-room/${storeUser.user.id}`, {name: name.value}, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        Toast.success(`${response.data.room.name} was created successfully!`);
                        rooms.value.push(response.data.room);
                    })
                },

                getMessages = (room: Record<string, any>, index: number) => {
                    if(roomActInd.value != -1) rooms.value[roomActInd.value].current = false;
                    
                    room.current = true;
                    roomActInd.value = index;

                    axios.get(`http://${basicUrl}/chat/get-messages/${room.id}`, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        console.log(response)
                        messages.value = response.data;
                        // Toast.success(`${response.data.room.name} was created successfully!`);
                        // rooms.value.push(response.data.room);
                    })
                },

                getRooms = () => {
                    axios.get(`http://${basicUrl}/chat/get-rooms/${storeUser.user.id}`, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        console.log(response)
                        rooms.value = response.data;
                        // Toast.success(`${response.data.room.name} was created successfully!`);
                        // rooms.value.push(response.data.room);
                    })
                };

            getRooms();

            return {
                modalToggle,
                name,

                rooms,
                messages,
                getMessages,
                roomActInd,

                showNewModal,
                sendRoom,

                accessToken: storeToken.accessToken,
                login      : storeUser.user.login,
            }
        }
    })
</script>



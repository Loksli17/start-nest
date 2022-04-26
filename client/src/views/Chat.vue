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
                
                <div class="grid gap-4">
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
                    <div v-if="roomActInd != -1" class=" p-4 bg-blue-100 rounded grid grid-flow-col items-center grid-cols-chat-current-room-wrap gap-4">
                        <div class="text-2xl">{{rooms[roomActInd].name}}</div>

                        <div class="text-xl text-blue-700">
                            [ {{rooms[roomActInd].user.login}} ]
                        </div>

                        <div>
                            <button class=" bg-white rounded p-2" @click="modalShowRoomToggle = true">Info</button>
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


    <div v-if="roomActInd != -1" @click.self="modalShowRoomToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-900 opacity-90 top-0 left-0" :class="{'hidden': !modalShowRoomToggle}">

        <div class="p-8 bg-white rounded grid gap-6 min-w-modal ">

            <div>
                <h2 class=" text-3xl">{{rooms[roomActInd].name}}</h2>
                <div class=" bg-cover w-50 rounded-l" :style="{ backgroundImage: `url(http://localhost:3000/room-img/${rooms[roomActInd].img})` }"></div>
            </div>

            <div class="grid grid-flow-col auto-cols-max items-center gap-5">
                <div class=" text-xl">
                    Author: {{rooms[roomActInd].user.login}}
                </div>

                <div v-if="rooms[roomActInd].user.login == login">
                    <button class="p-2 w-max bg-green-500 hover:bg-green-700 transition-all  text-white rounded" @click="showAddUserModal()">Add user</button>
                </div>

                <div v-if="rooms[roomActInd].user.login == login">
                    <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all text-white rounded" @click="uploadImg()">Edit room image</button>
                </div>

                <div v-if="rooms[roomActInd].user.login == login">
                    <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all  text-white rounded" @click="editName()">Edit room's name</button>
                </div>
            </div>

            <div class="grid gap-4">
                <h2 class=" text-2xl">Users</h2>
                
                <div class="grid gap-2">
                    <div v-for="user in rooms[roomActInd].users" :key="user.id">
                        <div class=" px-4 py-2  bg-gray-200 grid grid-flow-col items-center grid-cols-chat-room-user ">
                            
                            <div class="text-lg">
                                {{user.login}}
                            </div>
                        
                            <div v-if="rooms[roomActInd].user.login == login">
                                <button class="p-2 w-max bg-red-500 hover:bg-red-700 transition-all text-md text-white rounded" @click="removeUserFromRoom(user, rooms[roomActInd].id)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div @click.self="modalAddUserToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 opacity-90 top-0 left-0" :class="{'hidden': !modalAddUserToggle}">
            
        <div class="p-8 bg-white rounded grid gap-6 min-w-modal ">

            <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all text-white rounded" @click="modalAddUserToggle = false; modalShowRoomToggle = true">Back</button>

            <form class=" bg-white grid gap-10 opacity-100">
                <input class="cursor-pointer border-2 rounded border-gray-600 p-3" type="text" name="searchLogin" v-model="searchLogin" @input="searchUser(rooms[roomActInd])">
            </form>

            <div v-if="searhedUsers.length > 0" class="mt-5 grid gap-4">
                <div class="px-4 py-2  bg-gray-200 grid grid-flow-col items-center grid-cols-chat-room-user" v-for="user in searhedUsers" :key="user.id">
                    <div>{{user.login}}</div>
                    
                    <div>
                        <button class="p-2 w-max bg-green-500 hover:bg-green-700 transition-all text-md text-white rounded" @click="addUserInRoom(user, rooms[roomActInd].id)">Add</button>
                    </div>
                </div>
            </div>
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
                searhedUsers: Ref<Array<Record<string, any>>> = ref([]),
                roomActInd  : Ref<number>                     = ref(-1),
                rooms       : Ref<Array<Record<string, any>>> = ref([]),
                messages    : Ref<Array<Record<string, any>>> = ref([]),
                searchLogin : Ref<string>                     = ref(''),
                name        : Ref<string>                     = ref(''),
                modalToggle : Ref<boolean>                    = ref(false);
            
            let
                modalAddUserToggle : Ref<boolean> = ref(false),
                modalShowRoomToggle: Ref<boolean> = ref(false);
            

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
                    })
                },

                getRooms = () => {
                    axios.get(`http://${basicUrl}/chat/get-rooms/${storeUser.user.id}`, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {

                        rooms.value = response.data;
                    })
                },

                showAddUserModal = () => {
                    modalShowRoomToggle.value = false;
                    modalAddUserToggle.value  = true;
                },

                searchUser = (room: any) => {

                    if(searchLogin.value == "") {
                        searhedUsers.value = [];
                        return;
                    }

                    let ids: Array<number> = []; 
                    
                    room.users.forEach((user: any) => ids.push(user.id));

                    axios.post(`http://${basicUrl}/chat/search-user`, 
                        {
                            searchLogin: searchLogin.value,
                            userIds    : ids,
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${storeToken.accessToken}`
                            },
                            withCredentials: true,
                        }
                    ).then((response: AxiosResponse) => {
                        console.log(response.data);
                        searhedUsers.value = response.data;
                        // Toast.success(`${response.data.room.name} was created successfully!`);
                    });
                },

                removeUserFromRoom = (user: {id: number, login: string}, roomId: number) => {

                    axios.post(`http://${basicUrl}/chat/remove-user-from-room`, {user: user, roomId: roomId}, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        getRooms();
                        Toast.success(`${response.data.login} was removed successfully!`);
                    });
                },

                addUserInRoom = (user: {id: number, login: string}, roomId: number) => {

                    axios.put(`http://${basicUrl}/chat/add-user-in-room`, {user: user, roomId: roomId}, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        searhedUsers.value = searhedUsers.value.filter((user: any) => user.id != response.data.id);
                        getRooms();
                        Toast.success(`${response.data.login} was added successfully!`);
                    });
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

                modalShowRoomToggle,
                showAddUserModal,
                modalAddUserToggle,

                searchLogin,
                searchUser,
                searhedUsers,
                addUserInRoom,
                removeUserFromRoom,
            }
        }
    })
</script>



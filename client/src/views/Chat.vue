<template>

    <div v-if="accessToken == ''" class=" pt-24 pb-14">
        <h1 class=" text-2xl font-bold">You are not authorized. You should do it before chating! </h1>
    </div>

    <div v-else class=" pt-24 pb-14 h-screen box-border grid grid-rows-chat-page-wrap">

        <div class="px-10 grid grid-flow-col auto-cols-max gap-8 items-center">
            <h1 class=" text-5xl font-bold">Chat</h1>
            <span class="text-3xl text-blue-500">[ {{login}} ]</span>
        </div>

        <div class="mt-6 px-10 ">
            <button class="p-4 w-max bg-blue-500  text-white text-lg rounded" @click="showNewModal()">Create room</button>
        </div>

        <div class="mt-10 px-10 max-h-full">
            <div class="grid grid-cols-chat-wrap gap-6 h-full">
                
                <div class="grid gap-4 auto-rows-max overflow-y-auto max-h-rooms">
                    <div class="grid gap-4 grid-flow-col auto-cols-max cursor-pointer bg-gray-100 hover:bg-red-100 rounded" v-for="(room, index) in rooms" :key="room.id" :class="{'bg-green-100': room.current}" @click="getMessages(room, index)">
                        <div class=" bg-cover w-20 bg-center rounded-l" :style="{ backgroundImage: `url(http://localhost:3000/room-img/${room.img})` }">

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

                <div class="grid grid-rows-chat-section-wrap gap-5">
                    <div v-if="roomActInd != -1" class=" bg-blue-100 rounded grid grid-flow-col items-center grid-cols-chat-current-room-wrap gap-5">
                        
                        <div class=" bg-cover bg-center rounded-l h-full py-5" :style="{ backgroundImage: `url(http://localhost:3000/room-img/${rooms[roomActInd].img})` }"></div>
                        
                        <div class="text-2xl py-5">{{rooms[roomActInd].name}}</div>

                        <div class="text-xl text-blue-700 py-5">
                            [ {{rooms[roomActInd].user.login}} ]
                        </div>

                        <div class="py-5 pr-5">
                            <button class=" bg-white rounded p-2 text-lg hover:bg-gray-50 transition-all" @click="modalShowRoomToggle = true">Info</button>
                        </div>
                    </div>

                    <div v-if="(messages.length > 0) && roomActInd != -1" class="grid gap-3 auto-rows-max max-h-full overflow-auto" style="scroll-behavior: smooth" ref="messagesWrapRef">
                        <div v-for="message in messages" :key="message" class=" bg-gray-200 p-3 rounded grid gap-2 box-border mr-2">
                            <div class=" text-lg">
                                {{message.content}}
                            </div>
                            <div class=" text-xs">
                                {{message.user.login}} [ {{message.date}}  {{message.time}}] 
                            </div>
                        </div>
                    </div>

                    <div class=" text-xl " v-else-if="roomActInd != -1">
                        NO MESSANGES IN THIS CHAT
                    </div>

                    <div v-if="roomActInd != -1" class="">
                        <form @submit.prevent="sendMessage">
                            <input class="border-2 box-border w-full p-4 text-lg" type="text" v-model="message">
                        </form>
                    </div>
                </div>
                
            </div>
        </div>


        <div @click.self="modalToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 bg-opacity-80 top-0 left-0" :class="{'hidden': !modalToggle}">
            
            <form class=" bg-white p-8 grid gap-10 opacity-100">
                <input class="cursor-pointer border-2 border-gray-600 p-3" type="text" name="name" v-model="name">
                <input class=" p-4 bg-blue-500 text-white cursor-pointer" type="submit" @click.prevent="sendRoom" value="Create room">
            </form>

        </div>
    </div>


    <div v-if="roomActInd != -1" @click.self="modalShowRoomToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-900 bg-opacity-80 top-0 left-0" :class="{'hidden': !modalShowRoomToggle}">

        <div class="p-8 bg-white rounded grid gap-6 min-w-modal">

            <div>
                <h2 class=" text-3xl">{{rooms[roomActInd].name}}</h2>
                <!-- <div class=" bg-cover bg-center w-50 rounded-l" :style="{ backgroundImage: `url(http://localhost:3000/room-img/${rooms[roomActInd].img})` }"></div> -->
            </div>

            <div class="grid grid-flow-col auto-cols-max items-center gap-5">
                <div class=" text-xl">
                    Author: {{rooms[roomActInd].user.login}}
                </div>

                <div v-if="rooms[roomActInd].user.login == login">
                    <button class="p-2 w-max bg-green-500 hover:bg-green-700 transition-all  text-white rounded" @click="showAddUserModal()">Add user</button>
                </div>

                <div v-if="rooms[roomActInd].user.login == login">
                    <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all text-white rounded" @click="showEditImageModal()">Edit room's image</button>
                </div>

                <div v-if="rooms[roomActInd].user.login == login">
                    <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all  text-white rounded" @click="showEditNameModal()">Edit room's name</button>
                </div>
            </div>

            <div class="grid gap-4">
                <h2 class=" text-2xl">Users</h2>
                
                <div class="grid gap-2">
                    <div v-for="user in rooms[roomActInd].users" :key="user.id">
                        <div class=" px-4 py-2  bg-gray-200 grid grid-flow-col items-center grid-cols-chat-room-user ">
                            
                            <div class="text-lg h-10 grid items-center">
                                <span>{{user.login}}</span>
                            </div>
                        
                            <div v-if="rooms[roomActInd].user.login == login && login != user.login">
                                <button class="p-2 w-max bg-red-500 hover:bg-red-700 transition-all text-md text-white rounded" @click="removeUserFromRoom(user, rooms[roomActInd].id)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div @click.self="modalAddUserToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 bg-opacity-80 top-0 left-0" :class="{'hidden': !modalAddUserToggle}">
            
        <div class="p-8 bg-white rounded grid gap-6 min-w-modal ">

            <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all text-white rounded" @click="modalAddUserToggle = false; modalShowRoomToggle = true">Back</button>

            <h2 class="text-xl"> Add user in Room</h2>

            <form class=" bg-white grid gap-10 opacity-100">
                <input placeholder="Write user login.." class="cursor-pointer border-2 rounded border-gray-600 p-3" type="text" name="searchLogin" v-model="searchLogin" @input="searchUser(rooms[roomActInd])">
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


    <div v-if="roomActInd > -1" @click.self="modalEditRoomNameToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 bg-opacity-80 top-0 left-0" :class="{'hidden': !modalEditRoomNameToggle}">
            
        <div class="p-8 bg-white rounded grid gap-6 min-w-modal ">

            <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all text-white rounded" @click="modalEditRoomNameToggle = false; modalShowRoomToggle = true">Back</button>

            <h1 class="text-xl">Edit Room name <span class=" text-green-400">[ {{rooms[roomActInd].name}} ]</span></h1>

            <form class=" bg-white grid gap-10 opacity-100" @submit.prevent="editRoomName(rooms[roomActInd])">
                <input placeholder="Edit new room name" class="cursor-pointer border-2 rounded border-gray-600 p-3" type="text" name="roomName" v-model="newRoomName">
                <input class="p-3 bg-blue-500 hover:bg-blue-700 text-white rounded w-32" type="submit" value="Edit name">
            </form>

        </div>
    </div>


    <div v-if="roomActInd > -1" @click.self="modalEditRoomImageToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 bg-opacity-80 top-0 left-0" :class="{'hidden': !modalEditRoomImageToggle}">
            
        <div class="p-8 bg-white rounded grid gap-6 h-max min-w-modal max-h-modal max-w-modal">

            <button class="p-2 w-max bg-blue-500 hover:bg-blue-700 transition-all text-white rounded" @click="modalEditRoomImageToggle = false; modalShowRoomToggle = true">Back</button>

            <h1 class="text-xl">Edit Room image <span class=" text-green-400">[ {{rooms[roomActInd].name}} ]</span></h1>
            
            <div>
                <SingleFileUpload
                    :types="fileTypes"
                    :uploadFieldClass="'file-single-upload-field'"
                    :max-file-size="1024 * 1024 * 10"
                    v-model:file-added-status="fileAddedStatus"

                    @load-handler="imageLoad"
                    @type-error-handler="fileTypeError"
                    @size-error-handler="fileSizeError"
                    @not-drag-and-drop-capable-error="dragAndDropCapableError"
                    
                />
            </div>

        </div>
    </div>
</template>


<script lang="ts">
    import axios, { AxiosResponse }              from 'axios';
    import { computed, defineComponent, inject, nextTick, Ref, ref } from 'vue';
    import { ToastPluginApi }                    from 'vue-toast-notification';
    import { useUserStore }                      from '../store/user';
    import { useTokenStore }                     from './../store/token';
    
    import SingleFileUpload                      from './../components/FileUpload/SingleFileUpload.vue';
    import { AddFile, LoadingSingleFile }        from "./../components/FileUpload/types";
    import { Socket, io }                        from 'socket.io-client';


    export default defineComponent({

        components: {
            SingleFileUpload
        },
        
        setup(){
            
            const
                basicUrl              = "127.0.0.1:3000",
                storeToken            = useTokenStore(),
                storeUser             = useUserStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            let
                searhedUsers: Ref<Array<Record<string, any>>> = ref([]),
                currentId   : Ref<number>                     = ref(-1),
                roomActInd  : Ref<number>                     = ref(-1),
                rooms       : Ref<Array<Record<string, any>>> = ref([]),
                messages    : Ref<Array<Record<string, any>>> = ref([]),
                newRoomName : Ref<string>                     = ref(''),
                searchLogin : Ref<string>                     = ref(''),
                name        : Ref<string>                     = ref(''),
                message     : Ref<string>                     = ref(''),
                modalToggle : Ref<boolean>                    = ref(false);
            
            let
                modalEditRoomImageToggle: Ref<boolean> = ref(false),
                modalEditRoomNameToggle : Ref<boolean> = ref(false),
                modalAddUserToggle      : Ref<boolean> = ref(false),
                modalShowRoomToggle     : Ref<boolean> = ref(false);

            let 
                messagesWrap: HTMLDivElement,
                messagesWrapRef = ref(null);

            const
                limit                            = 40,
                fileLoadedStatus: Ref<boolean>   = ref(false), 
                fileAddedStatus : Ref<boolean>   = ref(false),
                files           : Array<AddFile> = [],
                fileTypes       : Array<string>  = ['jpeg', 'png', 'jpg'];

            
            const socket: Socket = io('http://127.0.0.1:3000', {
                autoConnect    : true,
                withCredentials: true,
            });



            const 

                showNewModal = () => {
                    modalToggle.value = true;
                },

                scrollMessageWrap = () => {
                    messagesWrap           = messagesWrapRef.value as any;                    
                    messagesWrap.scrollTop = messagesWrap.scrollHeight;
                },

                sortRooms = () => {

                    rooms.value.sort((a: Record<string, any>, b: Record<string, any>): 0 | -1 | 1 => {
                        
                        const messageA: Record<string, any> | undefined = a.messages[0];
                        const messageB: Record<string, any> | undefined = b.messages[0];

                        if     ((messageA == undefined && messageB != undefined) || (messageA == undefined && messageB == undefined)) return 1;
                        else if((messageA != undefined) && (messageB == undefined)) return -1;

                        if     (new Date(messageA!.date) > new Date(messageB!.date)) return -1;
                        else if(new Date(messageA!.date) < new Date(messageB!.date)) return 1;
                        else {
                            if(messageA!.time < messageB!.time) return 1;
                            else return -1;
                        }
                    });
                },

                setCurrentInd = () => {
                    
                    rooms.value.forEach((room: Record<string, any>, index: number) => {
                        if(room.id === currentId.value) roomActInd.value = index;
                    });
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

                    axios.get(`http://${basicUrl}/chat/get-messages/${room.id}?limit=${limit}`, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        messages.value = response.data;
                        
                        nextTick(() => scrollMessageWrap());
                    });  
                },

                joinToChats = () => {

                    let roomsIds: Array<number> = [];

                    rooms.value.forEach((room: Record<string, any>) => {
                        roomsIds.push(room.id);
                    });

                    socket.emit('joinInRooms', {
                        roomsIds: roomsIds,
                    });
                },

                getRooms = (): Promise<void | Promise<AxiosResponse<any, any>>> => {
                    return axios.get(`http://${basicUrl}/chat/get-rooms/${storeUser.user.id}`, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        rooms.value = response.data;

                        rooms.value.map((room: Record<string, any>) => {
                        
                           if(room.messages.length > 0 && room.messages[0].content.length > 15) room.messages[0].content = room.messages[0].content.substr(0, 15) + "..."; 
                        });

                        sortRooms();
                    });
                },

                showAddUserModal = () => {
                    modalShowRoomToggle.value = false;
                    modalAddUserToggle.value  = true;
                },

                showEditNameModal = () => {
                    modalShowRoomToggle.value     = false;
                    modalEditRoomNameToggle.value = true;
                },

                showEditImageModal = () => {
                    modalShowRoomToggle.value      = false;
                    modalEditRoomImageToggle.value = true;
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
                        searhedUsers.value = response.data;
                    });
                },

                editRoomName = (room: any) => {

                    axios.put(`http://${basicUrl}/chat/edit-room-name`, 
                        {
                            name: newRoomName.value,
                            id  : room.id,
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${storeToken.accessToken}`
                            },
                            withCredentials: true,
                        }
                    ).then((response: AxiosResponse) => {
                        room.name         = response.data.name;
                        newRoomName.value = "";
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
                },

                imageLoad = async (loadingFile: LoadingSingleFile) => {
                    
                    const data: FormData = new FormData();
                    data.append("image", loadingFile.file);
                    
                    axios.post(`http://${basicUrl}/chat/edit-room-image?roomId=${rooms.value[roomActInd.value].id}&filename=${loadingFile.file.name}`, data, {
                        headers: {
                            Authorization: `Bearer ${storeToken.accessToken}`
                        },
                        onUploadProgress: (e) => {
                            loadingFile.progress = Math.floor(e.loaded * 100 / e.total);
                        },
                        withCredentials: true,
                    }).then((response: AxiosResponse) => {
                        getRooms();
                        Toast.success(`${response.data.filename} was uploaded successfully!`);
                    });
                },

                fileTypeError = (file: File, msg: string) => {
                    Toast.warning(`File must be: '${fileTypes.join("', '")}'`)
                },
                
                fileSizeError = (file: File, msg: string) => {
                    Toast.warning(`Size of file must be less then 10mb!`)
                },
                
                dragAndDropCapableError = (file: File, msg: string) => {
                    Toast.warning('Your browser don`t added drag & drop!')
                },

                sendMessage = () => {

                    socket.emit('message', {
                        content: message.value,
                        userId : storeUser.user.id,
                        roomId : rooms.value[roomActInd.value].id,
                    });

                    message.value = "";
                };


            socket.on('message', (data: any) => {

                if(data.userId != storeUser.user.id) Toast.info(`${data.content}`);

                rooms.value.forEach((room: Record<string, any>) => {
                    
                    if(room.id === data.roomId) {
                        if(room.messages.length == 0 || room.messages == undefined) {
                            room.messages = [];
                            room.messages.push(data);
                        } else {
                            room.messages[0] = Object.assign({}, data);
                        }

                        if(room.messages[0].content.length > 15) 
                            room.messages[0].content = room.messages[0].content.substr(0, 15) + "...";
                    } 
                    
                });
                
                currentId.value = rooms.value[roomActInd.value].id;
                sortRooms();
                setCurrentInd();

                if(data.roomId !== rooms.value[roomActInd.value].id) return;
                messages.value.push(data);

                nextTick(() => scrollMessageWrap());
            });

            // computed(messages.value)


            getRooms().then(() => joinToChats());

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
                showEditNameModal,
                showEditImageModal,

                modalAddUserToggle,
                modalEditRoomNameToggle,
                modalEditRoomImageToggle,

                searchLogin,
                searchUser,
                searhedUsers,
                addUserInRoom,
                removeUserFromRoom,

                editRoomName,
                newRoomName,

                fileTypes,
                files,
                fileAddedStatus,
                fileLoadedStatus,
                imageLoad,
                dragAndDropCapableError,
                fileSizeError,
                fileTypeError,

                sendMessage,
                message,

                messagesWrapRef,
            }
        }
    })
</script>



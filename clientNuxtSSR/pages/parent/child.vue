<script setup lang="ts">
    import { useUserStore } from '~~/store/user';
    const store = useUserStore();

    const randNumber = ref(0);

    const chatRooms = ref([] as Array<any>);
    
    const login = async () => {
        // ! we make a request to the front-end server, which, in turn,
        // ! makes a request to out backend API
        try {
            const res = await useFetch("/api/login", {
                method: "POST",
                body: {
                    login: "loksli",
                    password: "123"
                }
            });

            const { userId, jwt } = res.data.value;

            store.setUser(userId, jwt);

            const { $toast } = useNuxtApp();

            $toast.success("Logged in");
        } catch (err) {
            const { $toast } = useNuxtApp();

            $toast.error(`Error: ${err}`);
        }
    }

    let refresher = ref(null as any | null);
    
    const getChatRooms = async () => {
        try {

            // ! making additional request doesn't do anything, in order to repeate these
            // ! requests we need to use 'refresh'
            const { data, refresh } = await useFetch("/api/chat-rooms", { headers: {
                Authorization: `Bearer ${store.jwt}`
            } });

            
            refresher.value = refresh;
            
            chatRooms.value = data.value.chatRooms;
        } catch (err) {
            
            const { $toast } = useNuxtApp();

            $toast.error(`Error: ${err}`);
        }
    }
</script>

<template>
    <div>
        <h1>Hi</h1>

        <div>
            <p>{{ randNumber }}</p>
            <CustomButton @click="randNumber++">increment</CustomButton>
            <CustomButton @click="login">Login</CustomButton>
            <CustomButton @click="getChatRooms">Chats</CustomButton>
            <CustomButton v-show="refresher" @click="refresher">refresh</CustomButton>
        </div>

        <span>Chatrooms: {{ chatRooms.length }}</span>
        <div class=" bg-slate-900 text-gray-300 p-4 rounded">
            <ul class=" list-none grid grid-flow-row gap-y-2">
                <li 
                    class="px-4 py-2 rounded bg-green-800 hover:bg-green-500"
                    v-for="chat in chatRooms" 
                    :key="chat.id">
                    <h1>{{ chat.name }}</h1>
                </li>
            </ul>
        </div>

        <!-- Client-side render only -->
        <client-only>
            <div class=" bg-blue-900">
                <h1>This is client only</h1>

                <p>number: {{ randNumber }}</p>
            </div>

            <div>
            </div>
        </client-only>

        <CustomLink to="/parent">to parent</CustomLink>
    </div>
</template>
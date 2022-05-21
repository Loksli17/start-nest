<script setup lang="ts">
    import { useUserStore } from '~~/store/user';
    const store = useUserStore();

    // ! we can create a plugin fetch, based on regular fetch 
    const { $useApiFetch } = useNuxtApp();

    const counter = ref(0);
    const chatRooms = ref([] as Array<any>);
    
    const login = async () => {

        try {
            const { data } = await useFetch<{ userId: number; accessToken: string }>("http://localhost:3000/auth/login", {
                method: "POST",
                body: {
                    login: "loksli",
                    password: "123"
                },
                credentials: "include"
            });

            const { userId, accessToken } = data.value;

            store.setUser(userId, accessToken);

            const { $toast } = useNuxtApp();

            $toast.success("Logged in");
        } catch (err) {
            const { $toast } = useNuxtApp();

            $toast.error(`Error: ${err}`);
        }
    }
    
    const getChatRooms = async () => {
        try {

            // ! then we can use that fetch to get data with all the retries and error handling
            const { data } = await $useApiFetch("http://localhost:3000/chat/get-rooms/1", 
                {
                    headers: {
                        Authorization: `Bearer ${store.jwt}`,
                        credentials: "include"
                    }
                },
                getChatRooms
            );
            
            chatRooms.value = data.value as any ?? [];

        } catch (err) {
            
            const { $toast } = useNuxtApp();

            $toast.error(`Error: ${err}`);
        }
    }

    const getMessages = async () => {
        const { data } = await $useApiFetch("http://localhost:3000/chat/get-messages/1", {
            headers: {
                Authorization: `Bearer ${store.jwt}`,
                credentials: "include"
            }
        }, getMessages);

        console.log(data.value)
    }
</script>


<template>
    <div>
        <h1>Hi</h1>

        <div>
            <p>{{ counter }}</p>
            <CustomButton @click="counter++">increment</CustomButton>
            <CustomButton @click="login">Login</CustomButton>
            <CustomButton @click="getChatRooms">Chats</CustomButton>
            <CustomButton @click="getMessages">Get messages</CustomButton>
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

        <client-only>
            <div class=" bg-blue-900">
                <h1>This is client only</h1>

                <p>number: {{ counter }}</p>
            </div>

            <div>
            </div>
        </client-only>

        <CustomLink to="/parent">to parent</CustomLink>
    </div>
</template>
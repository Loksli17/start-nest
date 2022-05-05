import { useUserStore } from "~~/store/user";


export default async function useChatRoomList(userId: number) {
    const userStore = useUserStore();

    const { data, error, refresh } = await useFetch(`http://localhost:3000/chat/get-rooms/${userId}`, 
        {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`,
                credentials: "include"
            },
            // ! useNuxtApp is not available here, soooooo
            async onResponseError() {

                const { data, error } = await useFetch<{ accessToken: string }>("http://localhost:3000/auth/create-tokens", {
                    method: "POST",
                    credentials: "include",
                    pick: ["accessToken"]
                });

                userStore.setJwt(data.value.accessToken);

                console.error(error.value);
            }
        },
        
    );

    if (error.value !== null) {
        await refresh();
    }

    return { data, error }
}
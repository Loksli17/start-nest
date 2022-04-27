import { useUserStore } from "~~/store/user";

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const res = await $fetch("http://localhost:3000/auth/login", {
        method: "POST",
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost' 
        },
        credentials: "include",
        body: body
    });

    const { accessToken, userId } = (res as any);

    return { jwt: accessToken, userId }
});
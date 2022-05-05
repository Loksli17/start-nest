import { useUserStore } from "~~/store/user";


export default async function useRefreshToken() {
    const userStore = useUserStore();

    const { data, error } = await useFetch<{ accessToken: string }>("http://localhost:3000/auth/create-tokens", {
        method: "POST",
        credentials: "include",
        pick: ["accessToken"]
    });


    userStore.setJwt(data.value.accessToken);

    return { data, error }
}
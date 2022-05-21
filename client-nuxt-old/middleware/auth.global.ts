import { useUserStore } from "~~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore();

    if (!store.isAuth && from.path !== "/") {
        return navigateTo("/");
    }
});
import { useUserStore } from "~~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore();
    
    console.log(from.path)
    if (!store.isAuth && from.path !== "/") {
        return navigateTo("/");
    }
});
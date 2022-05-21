export default defineNuxtRouteMiddleware((to, from) => {
    if (+to.params.id === 69) {
        if (process.client) {
            console.log("nice");
        }
    }

    if (+to.params.id === 42) {
        return abortNavigation();
    }
})
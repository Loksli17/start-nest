import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        userId: 0,
        jwt: ""
    }),
    getters: {
        isAuth: (state) => state.jwt.length > 0,
    },
    actions: {
        setUser(userId: number, jwt: string) {
            this.userId = userId;
            this.jwt = jwt;
        },
        setJwt(jwt: string) {
            this.jwt = jwt;
        },
        reset() {
            this.userId = 0;
            this.jwt = "";
        }
    },
    persist: true
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
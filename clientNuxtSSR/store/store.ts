import { defineStore, acceptHMRUpdate } from "pinia";


export const useStore = defineStore('main', {
    state: () => ({
        counter: 0,
    }),
    actions: {
        increment() {
            this.counter++;
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random());
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
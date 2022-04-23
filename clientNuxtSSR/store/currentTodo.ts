import { defineStore, acceptHMRUpdate } from "pinia";
import ITodo from "~~/types/Todo";

export const useCurrentTodo = defineStore("currentTodo", {
    state: () => ({
        currentTodo: {
            userId: 0,
            id: 0,
            title: "",
            completed: false
        } as ITodo
    }),
    actions: {
        setTodo(val: ITodo) {
            this.currentTodo = val;
        }
    },
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCurrentTodo, import.meta.hot))
}
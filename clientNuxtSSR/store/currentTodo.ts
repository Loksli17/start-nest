import { defineStore, acceptHMRUpdate } from "pinia";
import Todo from "~~/types/Todo";

export const useCurrentTodo = defineStore("currentTodo", {
    state: () => ({
        currentTodo: {
            id: 0,
            date: "",
            taskTypeId: 0,
            text: "",
            time: "",
            type: {
                id: 0,
                name: ""
            }
        } as Todo
    }),
    actions: {
        setTodo(val: Todo) {
            this.currentTodo = val;
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCurrentTodo, import.meta.hot))
}
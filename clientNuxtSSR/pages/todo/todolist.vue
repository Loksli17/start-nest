<template>
    <div>
        <div v-if="todolist" class=" grid grid-flow-col gap-x-3" v-for="todo in todolist" :key="todo.id">
            <span>{{ todo.text }}</span>
            <span>{{ todo.date }}</span>
            <span>{{ todo.type.name }}</span>
        </div>
        <nuxt-link to="/">home</nuxt-link>
    </div>
</template>

<script setup lang="ts">
    import { useCurrentTodo } from '~~/store/currentTodo';
    import Todo from '~~/types/Todo';
    
    const store = useCurrentTodo();
    const todolist = ref([] as Array<Todo>);

    try {
        // const res = await useFetch("http://localhost:3000/task/get-all");

        // todolist.value = (res.data.value as any).tasks;
        todolist.value = [
            {
                id: 0,
                date: "",
                taskTypeId: 0,
                text: "",
                time: "",
                type: {
                    id: 0,
                    name: "fuck off"
                }
            },
            {
                id: 1,
                date: "kek",
                taskTypeId: 2,
                text: "haha",
                time: "no",
                type: {
                    id: 1,
                    name: "fuck you"
                }
            }
        ];
        store.setTodo(todolist.value[Math.round(Math.random())]);
    } catch (err) {
        console.error(err);
    }


</script>
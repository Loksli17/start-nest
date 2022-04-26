
<script setup lang="ts">
    import { useCurrentTodo } from '~~/store/currentTodo';
    import ITodo              from '~~/types/Todo';
    
    const store = useCurrentTodo();
    const todoArr = useState<Array<ITodo>>("todolist", () => []);

    const randomTodo = computed(() => store.currentTodo);

    try {
        const { data } = await useFetch("https://jsonplaceholder.typicode.com/todos");

        if (!data.value) {
            throw new Error("fuck");
        }

        todoArr.value = data.value as Array<ITodo>;

        if (process.client) {
            const { $toast } = useNuxtApp();

            $toast.success("Received data from API");
        }

    } catch (err) {

        console.error(err);
    }

    if (process.client) {
        console.log("client");
        console.log(document);
    }

    if (process.server) {
        console.log("server");
        // console.log(document);
    }

    const setRandomTodo = () => {
        store.setTodo(todoArr.value[Math.round(Math.random() * todoArr.value.length)]);

        if (process.client) {
            const { $toast } = useNuxtApp();

            $toast.info("Set random todo");
        }
    }

    useHead({
        title: "Todolist",
        meta: [
            { name: "description", content: "Todo list page" } 
        ]
    });
</script>

<template>
    <div class="grid grid-flow-row gap-y-3 m-4">
        <TodoList v-if="todoArr" :todo-list="todoArr" />

        <div class="">
            <h1>Random todo</h1>
            <Todo :todo="randomTodo" /> 
            
            <CustomButton @click="setRandomTodo">random</CustomButton>
        </div>

        <nuxt-link to="/">home</nuxt-link>
    </div>
</template>

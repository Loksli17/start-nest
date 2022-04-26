
<script setup lang="ts">
    import { useCurrentTodo } from '~~/store/currentTodo';
    import ITodo              from '~~/types/Todo';
    
    const store = useCurrentTodo();
    const todoArr = useState<Array<ITodo>>("todolist", () => []);

    const randomTodo = computed(() => store.currentTodo);

    try {
        const res = await useFetch("https://jsonplaceholder.typicode.com/todos");

        if (!res.data.value) {
            throw new Error("fuck");
        }

        todoArr.value = res.data.value as Array<ITodo>;

    } catch (err) {

        console.error(err);
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

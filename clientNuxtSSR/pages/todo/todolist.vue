<template>
    <div class="grid grid-flow-row gap-y-3 m-4">
        <TodoListComponent v-if="todolist" :todo-list="todolist" />

        <div class="">
            <h1>Random todo</h1>
            <Todo :todo="randomTodo" /> 
            <button @click="setRandomTodo">random</button>
        </div>

        <nuxt-link to="/">home</nuxt-link>
    </div>
</template>

<script setup lang="ts">
    import { useCurrentTodo } from '~~/store/currentTodo';
    import ITodo from '~~/types/Todo';
    import TodoListComponent from '~~/components/TodoList/TodoList.vue';
    import Todo from '~~/components/TodoList/Todo.vue';
    
    const store = useCurrentTodo();
    const todolist = ref([] as Array<ITodo>);

    const randomTodo = computed(() => store.currentTodo);

    try {
        const res = await useFetch("https://jsonplaceholder.typicode.com/todos");
        console.log(res.data.value)
        todolist.value = (res.data.value as any);

    } catch (err) {
        console.error(err);
    }

    const setRandomTodo = () => {
        store.setTodo(todolist.value[Math.round(Math.random() * todolist.value.length)]);
    }

</script>
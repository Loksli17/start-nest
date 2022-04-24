<script setup lang="ts">
    import { useCurrentTodo } from '~~/store/currentTodo';
    import Todo               from '~~/components/TodoList/Todo.vue';

    const store = useCurrentTodo();
    const currentTodo = store.currentTodo;

    useHead({
        title: "Index",
        meta: [
            { name: "description",    content: "Cool index page description" },
            { name: "og:title",       content: "Cool site | Index" },
            { name: "og:description", content: "Cool index page description" }
        ]
    });
</script>

<template>
    <div class=" grid grid-flow-row gap-y-2 m-2">
        <div class=" p-4 rounded bg-slate-500">
            <h1 class="font-medium">Test</h1>

            <div class=" grid grid-flow-col gap-x-1 grid-cols-5">
                <nuxt-link class="hover:text-teal-800" to="/about">about</nuxt-link>
                <nuxt-link class="hover:text-teal-800" to="/parent/child">child</nuxt-link>
                <nuxt-link class="hover:text-red-800" to="/todo/todolist">todolist</nuxt-link>
                <nuxt-link class="hover:text-teal-800" to="/list">list</nuxt-link>
                <nuxt-link class="hover:text-teal-800" to="/users/admins/69">test</nuxt-link>
            </div>
        </div>


        <div class=" p-4 rounded bg-slate-500">
            <h1 class="font-medium">Current todo</h1>

            <div class=" grid grid-flow-row gap-y-1 p-3 rounded">
                <Todo :todo="currentTodo" />
            </div>
        </div>
    </div>
</template>

<template>
    <div>
        <h1 class="font-medium bg-black text-white">Test</h1>
        
        <Counter />

        <nuxt-link class="underline hover:first-letter:font-medium" to="/about">about</nuxt-link>
        <nuxt-link to="/parent/child">child</nuxt-link>
        <nuxt-link to="/todo/todolist">todolist</nuxt-link>

        <div>
            <span>{{ currentTodo.id }}</span>
            <span>{{ currentTodo.date }}</span>
            <span>{{ currentTodo.type.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Counter from '../components/Counter.vue';
    import { useCurrentTodo } from '~~/store/currentTodo';

    const store = useCurrentTodo();

    const currentTodo = store.currentTodo;
</script>
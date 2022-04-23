<script setup lang="ts">
    import ITodo from "~~/types/Todo";

    defineProps<{
        todo: ITodo
    }>()
</script>

<template>
    <li class=" p-2 box-border border-2 border-solid rounded-md border-l-slate-300">
        <label>
            <input type="checkbox" :checked="todo.completed">
            <span> {{ todo.title }} </span>
        </label>
    </li>
</template>
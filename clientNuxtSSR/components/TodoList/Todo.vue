<script setup lang="ts">
    import ITodo from "~~/types/Todo";

    defineProps<{
        todo: ITodo
    }>()
</script>

<template>
    <li class=" select-none list-none px-3 py-2 box-border border border-solid rounded-md border-green-300 hover:bg-emerald-300 hover:text-white">
        <label class="grid grid-flow-col gap-x-4 justify-start items-center">
            <input type="checkbox" :checked="todo.completed">
            <span class="cursor-pointer"> {{ todo.title }} </span>
        </label>
    </li>
</template>
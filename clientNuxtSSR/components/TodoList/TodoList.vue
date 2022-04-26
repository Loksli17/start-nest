<script setup lang="ts">
    import ITodo from '~~/types/Todo';

    defineProps<{
        todoList: Array<ITodo>
    }>()
</script>

<template>
    <div class="grid grid-flow-row gap-y-2">
        <Todo 
            v-for="todo in todoList" 
            :todo="todo" 
            :key="todo.id" 
            />
    </div>
</template>
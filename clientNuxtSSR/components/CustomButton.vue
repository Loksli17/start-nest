<script setup lang="ts">
    defineEmits<{
        (e: 'click', evt: MouseEvent): any
    }>();
</script>

<template>
    <button 
        @click="$emit('click', $event)"
        class=" p-2 my-4 rounded-md border border-green-300 hover:bg-emerald-500 hover:text-white"
        >
        <slot></slot>
    </button>
</template>
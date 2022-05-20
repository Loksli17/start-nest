<script setup lang="ts">
    defineEmits<{
        (e: 'click', evt: MouseEvent): any
    }>();
</script>

<template>
    <button 
        @click="$emit('click', $event)"
        class="py-2 px-4 my-4 rounded-md border border-green-600 bg-emerald-900 hover:bg-emerald-500 hover:text-white"
        >
        <slot></slot>
    </button>
</template>
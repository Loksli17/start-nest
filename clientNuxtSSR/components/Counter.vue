<template>
    <div>
        <span class=" bg-gray-700 text-white font-bold" >{{ counter }}</span>
        <button class=" px-4 py-2 bg-gray-900 text-white rounded-md" @click="incrCounter">+</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const counter = ref(0);

    const incrCounter = () => {
        counter.value++
    };
</script>


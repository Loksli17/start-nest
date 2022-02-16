<template>
    <div>
        <span>{{ counter }}</span>
        <button @click="incrCounter">+</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const counter = ref(0);

    const incrCounter = () => counter.value++;
</script>


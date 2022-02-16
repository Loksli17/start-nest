<template>
    <div>
        <h2>Test</h2>
        <Counter />

        <nuxt-link to="/about">about</nuxt-link>
        <nuxt-link to="/parent/child">child</nuxt-link>
    </div>
</template>

<script setup lang="ts">
    import Counter from '../components/Counter.vue';
</script>
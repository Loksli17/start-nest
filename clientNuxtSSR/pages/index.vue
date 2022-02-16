<template>
    <div>
        <h1 class="font-medium bg-black text-white">Test</h1>
        
        <Counter />

        <nuxt-link class="underline hover:first-letter:font-medium" to="/about">about</nuxt-link>
        <nuxt-link to="/parent/child">child</nuxt-link>
    </div>
</template>

<script setup lang="ts">
    import Counter from '../components/Counter.vue';
</script>
<script setup lang="ts">
    const randNumber = ref(0);
</script>

<template>
    <div>
        <h1>Hi</h1>

        <div>
            <p>{{ randNumber }}</p>
            <button @click="randNumber++">increment</button>
        </div>

        <!-- Client-side render only -->
        <client-only>
            <div>
                number: {{ randNumber }}
            </div>
        </client-only>

        <nuxt-link to="/parent">to parent</nuxt-link>
    </div>
</template>
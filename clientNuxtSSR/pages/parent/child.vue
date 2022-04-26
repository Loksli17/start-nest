<script setup lang="ts">
    const randNumber = ref(0);

    const genNumber = () => Math.random() * 100;
</script>

<template>
    <div>
        <h1>Hi</h1>

        <div>
            <p>{{ randNumber }}</p>
            <CustomButton @click="randNumber++">increment</CustomButton>
        </div>

        <!-- Client-side render only -->
        <client-only>
            <div class=" bg-blue-900">
                <h1>This is client only</h1>

                <p>number: {{ randNumber }}</p>
            </div>
        </client-only>

        <nuxt-link to="/parent">to parent</nuxt-link>
    </div>
</template>
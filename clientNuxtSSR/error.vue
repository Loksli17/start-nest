<script setup lang="ts">

    const props = defineProps<{
        error: any
    }>();

    const handleError = () => clearError({ redirect: "/" });
</script>

<template>
    <div>
        <h1>404</h1>

        <p>
            {{ error.message }}
        </p>

        <nuxt-link @click="handleError" to="/">home</nuxt-link>
    </div>
</template>
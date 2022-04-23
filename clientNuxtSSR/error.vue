<script setup lang="ts">

    defineProps<{
        error: any
    }>();

    const handleError = () => clearError({ redirect: "/" });
</script>

<template>
    <div class=" grid grid-flow-row gap-y-2 m-2 bg-slate-700 rounded p-4 text-white">
        <h1 class=" font-medium text-xs">404</h1>

        <p>
            {{ error.message }}
        </p>

        <nuxt-link @click="handleError" to="/">home</nuxt-link>
    </div>
</template>
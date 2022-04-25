<script setup lang="ts">

    defineProps<{
        error: any
    }>();

    const handleError = () => clearError({ redirect: "/" });

    useHead({
        title: "404",
        titleTemplate: "Cool site | %s",
        viewport: "width=device-width, initial-scale=1, maximum-scale=1",
        charset: "utf-8",
        meta: [
            { name: "description", content: "Cool site error page" } 
        ]
    });
</script>

<template>
    <div class=" grid grid-flow-row gap-y-2 m-2 bg-slate-500 rounded p-4 text-white">
        <h1 class=" font-medium text-[20px]">404</h1>

        <p>
            {{ error.message }}
        </p>

        <nuxt-link @click="handleError" to="/">home</nuxt-link>
    </div>
</template>
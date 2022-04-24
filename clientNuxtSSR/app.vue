<script setup lang="ts">
    import './assets/css/tailwind.css';

    useHead({
        title: "Index",
        titleTemplate: "Cool site | %s",
        viewport: "width=device-width, initial-scale=1, maximum-scale=1",
        charset: "utf-8",
        meta: [
            { name: "description", content: "Cool site description" },
        ]
    });
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
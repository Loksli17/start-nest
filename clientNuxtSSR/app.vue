<script setup lang="ts">

    useHead({
        title: "Index",
        titleTemplate: "Cool site | %s",
        viewport: "width=device-width, initial-scale=1, maximum-scale=1",
        charset: "utf-8",
        meta: [
            { name: "description",  content: "Cool site description" },
            { name: "color-scheme", content: "dark light" }
        ]
    });
</script>

<template>
    <div class=" text-gray-300">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
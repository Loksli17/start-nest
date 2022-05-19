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
            { name: "description",  content: "Cool site error page" },
            { name: "color-scheme", content: "dark light" }
        ]
    });

    // ! this will output 'kek' in both client AND server consoles
    console.log("kek")
</script>

<template>
    <div class=" grid grid-flow-row gap-y-2 m-2 bg-slate-500 rounded p-4 text-white">
        <h1 class=" font-medium text-lg">{{ error.statusCode }}</h1>

        <div>
            Path: <CustomLink :to="error.url">{{ error.url }}</CustomLink>
        </div>

        <p>
            {{ error.message }}
        </p>

        <CustomLink @click="handleError" to="/">home</CustomLink>
    </div>
</template>
<template>
    <NuxtLayout name="custom">
        <template #header>
            <h1>Parent header</h1>
        </template>
        <template #content>
            <NuxtPage />
            <nuxt-link to="/">home</nuxt-link>
        </template>
    </NuxtLayout>
</template>
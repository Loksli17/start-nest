<template>
    <NuxtLayout name="custom">
        <template #header>
            <h1>Parent header</h1>
        </template>
        <template #content>
            <NuxtPage />
            <CustomLink to="/">home</CustomLink>
        </template>
    </NuxtLayout>
</template>
<template>
    <div>
        <div>
            <div v-for="el in arr" :key="el.id">
                <span>{{ el.text }}</span>
            </div>
        </div>
        <CustomLink to="/">home</CustomLink>
    </div>
</template>

<script setup lang="ts">
    const { arr } = await import("~~/assets/data/data.json");

    // console.log(arr);
</script>
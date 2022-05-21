<script setup lang="ts">
    const createError = () => {
        throw new Error("lol");
    }
</script>

<template>
    <div>
        <CustomButton @click="createError">HAHAHA</CustomButton>
    </div>
</template>
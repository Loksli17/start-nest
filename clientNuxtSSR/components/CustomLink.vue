<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

    defineProps<{
        to: RouteLocationRaw
    }>();
</script>

<template>
    <nuxt-link 
        class=" text-blue-600 hover:text-green-400 visited:text-purple-400"
        :to="to">
        <slot></slot>
    </nuxt-link>
</template>
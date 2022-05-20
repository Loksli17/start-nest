<script setup lang="ts">
    defineProps<{
        showModal: boolean;
        closeModal: () => void
    }>()
</script>

<template>
    <ClientOnly>
        <Teleport to="body">
            <div
                v-show="showModal" 
                class=" fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div class=" w-full h-full bg-black opacity-50" @click="closeModal"></div>
                <div class=" fixed px-6 py-4 rounded bg-slate-500">
                    <slot></slot>
                </div>
            </div>
        </Teleport>
    </ClientOnly>
</template>
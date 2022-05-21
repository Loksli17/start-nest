<script setup lang="ts">
    import Chat from "~~/types/Chat";

    defineProps<{
        chatRoom: Chat
    }>();
</script>

<template>
    <div>
        <!-- <img :src="`http://localhost:3000/room-img/${chatRoom.img}`" alt=""> -->
        <h1>{{ chatRoom.name }}</h1>
    </div>
</template>
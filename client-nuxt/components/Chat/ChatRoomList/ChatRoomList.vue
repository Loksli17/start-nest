<script setup lang="ts">
    import Chat from "~~/types/Chat";

    defineProps<{
        chatRoomList: Array<Chat>
    }>();
</script>

<template>
    <div>
        <ChatRoom 
            v-for="chatRoom in chatRoomList"
            :key="chatRoom.id"
            :chat-room="chatRoom" 
            />
    </div>
</template>
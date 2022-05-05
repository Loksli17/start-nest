<script setup lang="ts">
    import useChatRoomList from '~~/composables/chatRoomList';
    import { useUserStore } from '~~/store/user';

    const route     = useRoute();
    const userStore = useUserStore();

    const activeChat = computed(() => route.query.active);

    const { data, error } = await useChatRoomList(userStore.userId);

    if(error.value && process.client) {
        const { $toast } = useNuxtApp();
        $toast.error(`Error: ${error.value}`);
    }

    const chatRoomList = data.value;
</script>

<template>
    <div>
        <ChatRoomList v-if="chatRoomList" :chat-room-list="(chatRoomList as any)" />   
    </div>
</template>
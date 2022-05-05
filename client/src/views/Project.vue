
<template>
    
    <div v-if="accessToken == ''" class=" pt-24 pb-14">
        <h1 class=" text-2xl font-bold">You are not authorized. You should do it before drawing! </h1>
    </div>

    <div v-else class=" pt-24 pb-14 h-screen box-border grid grid-rows-chat-page-wrap">

        <div class="px-10 grid grid-flow-col auto-cols-max gap-8 items-center">
            <h1 class=" text-5xl font-bold">Projects</h1>
            <span class="text-3xl text-blue-500">[ {{login}} ]</span>
        </div>

        <router-view/>        
    </div>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useUserStore }    from '../store/user';

    export default defineComponent({
        
        setup() {

            const storeUser = useUserStore();
            
            return {
                login: storeUser.user.login
            }
        },
    })
</script>


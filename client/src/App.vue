<template>

    <div class="fixed z-10 h-16 grid grid-flow-col auto-cols-max gap-5 px-10 items-center bg-blue-200 w-full opacity-90" id="nav">
        <router-link class="text-gray-800 text-xl hover:underline" v-for="link in links" :key="link.to" :to="link.to">{{link.text}}</router-link>
    </div>


    <div class="md:h-full md:grid gap-8 bg-white">
        <router-view/>
    </div>

</template>


<script lang="ts">
    import { defineComponent, Ref, ref } from 'vue';

    export default defineComponent({
        
        setup(){

            const links: Ref<Array<{to: string, text: string}>> = ref([
                {to: "/",      text: 'Todolist'},
                {to: "/about", text: 'About'},
            ]);

            return {
                links
            }
        }
    })
</script>

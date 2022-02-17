<template>

    <div class="fixed z-10 h-16 grid grid-flow-col auto-cols-max gap-5 px-10 items-center bg-blue-200 w-full opacity-90" id="nav">
        <router-link class="text-gray-800 text-xl hover:underline" v-for="link in links" :key="link.to" :to="link.to">{{link.text}}</router-link>
    </div>

    <CustomScroll v-model:show-scroll="showScroll">
        <div class="md:h-full pt-24 md:grid gap-8 px-10 pb-14 bg-white">
            <router-view/>
        </div>
    </CustomScroll>

</template>


<script lang="ts">
    import { defineComponent, Ref, ref } from 'vue';
    import CustomScroll                  from './components/CustomScroll/CustomScroll.vue';

    export default defineComponent({

        components: {
            CustomScroll,
        },
        
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

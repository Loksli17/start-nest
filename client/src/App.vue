<template>

    <Menu/>

    <div class="md:h-full md:grid gap-8 bg-white">
        <router-view/>
    </div>

</template>


<script lang="ts">
    

    import { defineComponent } from 'vue';
    import Menu                from './components/Menu.vue';

    export default defineComponent({

        components: {
            Menu
        },
    })
</script>

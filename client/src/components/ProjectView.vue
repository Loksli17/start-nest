
<template>
    <router-link :to="{path: `/project/one/${data.id}`}" class="rounded bg-gray-300 grid grid-cols-project-wrap p-1 hover:bg-blue-200 transition-all">
        <div class=" bg-white h-56">

        </div>

        <div class=" h-max-content p-5 ">
            <h2>{{data.name}}</h2>
        </div>
    </router-link>
</template>


<script lang="ts">

    import { defineComponent } from 'vue';

    export default defineComponent({
        
        props: {
            data: {
                type    : Object as () => Record<string, any>,
                required: true,
            }
        },

        // setup(props) {

        // }
    });
</script>
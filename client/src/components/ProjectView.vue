
<template>
    <div class="rounded p-5 bg-gray-300 grid auto-rows-fr">
        <div>

        </div>

        <div class=" h-max-content">
            <h2>{{data.name}}</h2>
        </div>
    </div>
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
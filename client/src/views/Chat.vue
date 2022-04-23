<template>
    <div class=" pt-24 pb-14">

    </div>
</template>

<script lang="ts">
    import { defineComponent, inject } from 'vue';
    import { ToastPluginApi }          from 'vue-toast-notification';

    export default defineComponent({
        
        setup(){
            const Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            Toast.success("ZAZAZA");
        }
    })
</script>



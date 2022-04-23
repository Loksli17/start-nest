<template>
    <div class=" pt-24 pb-14">

    </div>
</template>

<script lang="ts">
    import { defineComponent, inject } from 'vue';
    import { ToastPluginApi }          from 'vue-toast-notification';
    import { useTokenStore }           from './../store/token';


    export default defineComponent({
        
        setup(){
            
            const
                store = useTokenStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            store.accessToken;

            console.log(store.accessToken);
            
            // Toast.success("ZAZAZA");
        }
    })
</script>



<template>
    <div class=" pt-24 pb-14">

    </div>
</template>

<script lang="ts">
    import axios, { AxiosResponse }                       from 'axios';
    import { defineComponent, inject } from 'vue';
    import { ToastPluginApi }          from 'vue-toast-notification';
    import { useTokenStore }           from './../store/token';


    export default defineComponent({
        
        setup(){
            
            const
                basicUrl              = "127.0.0.1:3000",
                store                 = useTokenStore(),
                Toast: ToastPluginApi = inject('Toast') as ToastPluginApi;

            store.accessToken;

            axios.post(`http://${basicUrl}/auth/check-token`, {}, {
                headers: {
                    Authorization: `Bearer ${store.accessToken}`
                }
            }).then((response: AxiosResponse) => {
                console.log(response);
            });
            
            // Toast.success("ZAZAZA");
        }
    })
</script>



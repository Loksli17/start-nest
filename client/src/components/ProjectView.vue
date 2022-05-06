
<template>

    <div @click="showContextMenu" v-click-away="onClickAway" class="rounded cursor-pointer bg-gray-300 grid grid-cols-project-wrap p-1 hover:bg-gray-400 transition-all">
    
        <div class=" bg-white h-56">

        </div>

        <div class=" h-max-content p-5 ">
            <h2>{{data.name}}</h2>
        </div>
    </div>

    <div ref="contentMenuRef" class=" fixed top-full left-0 bg-blue-100" :class="{'hidden': toggleMenu}">
        <router-link :to="{path: `/project/one/${data.id}`}" class="p-4 block hover:bg-blue-300 transition-all">Open project</router-link>
        <div class="p-4 hover:bg-blue-300 transition-all cursor-pointer"> Edit name</div>
        <div class="p-4 hover:bg-blue-300 transition-all cursor-pointer"> Copy Link </div>
    </div>

</template>



<script lang="ts">

    import { defineComponent, Ref, ref } from 'vue';

    export default defineComponent({
        
        props: {
            data: {
                type    : Object as () => Record<string, any>,
                required: true,
            }
        },

        setup(props) {

            const contentMenuRef = ref(null);

            let contextMenu: HTMLDivElement;
            let toggleMenu: Ref<boolean> = ref(true);
            
            
            const 
                showContextMenu = (event: MouseEvent) => {

                    contextMenu = contentMenuRef.value as any;

                    contextMenu.style.top  = (event.clientY + 15) + "px";
                    contextMenu.style.left = event.clientX + "px";

                    toggleMenu.value = false;
                },

                onClickAway = () => {
                    if(toggleMenu.value == false) toggleMenu.value = true;
                };


            return {
                toggleMenu,
                showContextMenu,
                onClickAway,

                contentMenuRef,
            }
        }
    });
</script>
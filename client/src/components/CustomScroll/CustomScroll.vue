<template>
    
    <div ref="wrapper" class="scroll-wrap">
        
        <div ref="scroller" class="scroller"></div>
    </div>

</template>


<script lang="ts">
    import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue';

    export default defineComponent({

        props: {
            fullPage: {
                type: Boolean,
                default: false,
            }
        },

        setup(props, { emit }){

            let
                oldYVal     : Ref<number> = ref(0),
                scroller                  = ref(null),
                docHeight   : Ref<number> = ref(0),
                screenHeight: Ref<number> = ref(0),
                percent     : Ref<number> = ref(0);

            let
                scrollElem: HTMLDivElement;

            if(props.fullPage){
                // docHeight.value = Math.max(
                //     document.body.scrollHeight, document.documentElement.scrollHeight,
                //     document.body.offsetHeight, document.documentElement.offsetHeight,
                //     document.body.clientHeight, document.documentElement.clientHeight
                // );

                screenHeight.value = document.documentElement.clientHeight;
                // percent.value = (screenHeight.value / docHeight.value) * 100;
            }

            
            const countData = () => {
                docHeight.value = Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                );

                console.log(screenHeight.value, docHeight.value)

                percent.value = (screenHeight.value / docHeight.value) * 100;

                scrollElem = scroller.value as any;
                scrollElem.style.height = percent.value + 'px';

                window.addEventListener('scroll', (e) => {
                    
                    let deltaY: number = window.scrollY - oldYVal.value;
                    let newTop: number = (deltaY * screenHeight.value) / docHeight.value;
                    
                    console.log(window.scrollY, screenHeight.value, window)
                    scrollElem.style.top = (newTop) + 'px';
                });
            };


            onMounted(() => {

                setTimeout(() => {
                    countData();
                }, 0);


                const resizeObserver = new ResizeObserver(entries => {
                    countData();
                });

                resizeObserver.observe(document.body);
            })


            return {
                docHeight,

                scroller
            }
        }
    })
</script>


<style>

    /* body::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    body {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    } */
    
    .scroll-wrap{
        width: 8px;
        height: 100%;
        position: fixed;
        background: #dad3d3;
        top: 0px;
        right: 0px;
    }

    .scroller{
        position: fixed;
        right: 0px;
        width: 6px;
        background: #e92323;
    }
</style>
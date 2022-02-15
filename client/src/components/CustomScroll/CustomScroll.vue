<template>

    <div ref="wrapperHtmlRef" class="scroll-main-wrapper">
        <slot></slot>

        <div ref="scrollerWrapHtmlRef" :class="{'scroll-wrap-body': body}">
            <div ref="scrollerHtmlRef" :class="{'scroller-body': body}"></div>
        </div>
    </div>

</template>



<script lang="ts">
    import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue';

    export default defineComponent({

        props: {
            body: {
                type: Boolean,
                default: false,
            }
        },

        setup(props, { emit }){

            let
                scrollerHeight: Ref<number> = ref(0), //* in percent
                wrapperHeight : Ref<number> = ref(0),
                screenHeight  : Ref<number> = ref(0);


            const
                wrapperHtmlRef     : Ref<any> = ref(null),
                scrollerWrapHtmlRef: Ref<any> = ref(null),
                scrollerHtmlRef    : Ref<any> = ref(null);

            let
                wrapperHtml     : HTMLDivElement,
                scrollerWrapHtml: HTMLDivElement,
                scrollerHtml    : HTMLDivElement;


            const countWrapperHeight = () => {
                if(props.body){
                    wrapperHeight.value = Math.max(
                        document.body.scrollHeight, document.documentElement.scrollHeight,
                        document.body.offsetHeight, document.documentElement.offsetHeight,
                        document.body.clientHeight, document.documentElement.clientHeight
                    );
                } else {
                    wrapperHeight.value = scrollerWrapHtml.scrollHeight;
                }
            };

            const countScreenHeight = () => {
                if(props.body){
                    screenHeight.value = document.documentElement.clientHeight;
                } else {
                    screenHeight.value = scrollerWrapHtml.clientHeight;
                }
            };

            const countScrollerHeight = () => {
                scrollerHeight.value = (screenHeight.value / wrapperHeight.value) * 100;
                scrollerHtml.style.height = scrollerHeight.value + '%';
            };

            const scrollHandeler = () => {
                window.addEventListener('scroll', (e) => {
                    let newTop: number = (window.scrollY * screenHeight.value) / wrapperHeight.value;
                    scrollerHtml.style.top = (newTop) + 'px';
                });
            };


            onMounted(() => {
                wrapperHtml      = wrapperHtmlRef.value as HTMLDivElement;
                scrollerHtml     = scrollerHtmlRef.value as HTMLDivElement;
                scrollerWrapHtml = scrollerWrapHtmlRef.value as HTMLDivElement;

                setTimeout(() => {
                    countWrapperHeight();
                    countScreenHeight();
                    countScrollerHeight();
                    scrollHandeler();
                }, 0);

                const resizeObserver = new ResizeObserver(entries => {
                    countWrapperHeight();
                    countScreenHeight();
                    countScrollerHeight();
                    scrollHandeler();
                });

                const elem = props.body ? document.body : wrapperHtml;

                resizeObserver.observe(elem);
            });

            return {
                wrapperHtmlRef,
                scrollerHtmlRef,
                scrollerWrapHtmlRef
            }

            // let
            //     oldYVal     : Ref<number> = ref(0),
            //     scrollerWrap              = ref(null),
            //     scroller                  = ref(null),
            //     docHeight   : Ref<number> = ref(0),
            //     screenHeight: Ref<number> = ref(0),
            //     percent     : Ref<number> = ref(0);

            // let
            //     scrollWrap: HTMLDivElement,
            //     scrollElem: HTMLDivElement;

            // if(props.body){
            //     screenHeight.value = document.documentElement.clientHeight;
            // } else {
            //     // screenHeight.value = document
            // }

            // const countData = () => {
            //     docHeight.value = Math.max(
            //         document.body.scrollHeight, document.documentElement.scrollHeight,
            //         document.body.offsetHeight, document.documentElement.offsetHeight,
            //         document.body.clientHeight, document.documentElement.clientHeight
            //     );

            //     percent.value = (screenHeight.value / docHeight.value) * 100;

            //     scrollElem = scroller.value as any;
            //     scrollElem.style.height = percent.value + '%';

            //     scrollerWrap = scrollerWrap.value as any;

            //     window.addEventListener('scroll', (e) => {
                    
            //         let deltaY: number = window.scrollY - oldYVal.value;
            //         let newTop: number = (deltaY * screenHeight.value) / docHeight.value;
                    
            //         console.log(window.scrollY, screenHeight.value, window)
            //         scrollElem.style.top = (newTop) + 'px';
            //     });
            // };

            // onMounted(() => {

            //     setTimeout(() => {
            //         countData();
            //     }, 0);

            //     const resizeObserver = new ResizeObserver(entries => {
            //         countData();
            //     });

            //     resizeObserver.observe(document.body);
            // })


            // return {
            //     docHeight,

            //     scrollerWrap,
            //     scroller
            // }
        }
    })
</script>


<style>

    body::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    body {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .scroll-main-wrapper{

    }
    
    .scroll-wrap-body{
        width: 10px;
        height: 100%;
        position: fixed;
        background: #dad3d3;
        top: 0px;
        right: 0px;
    }

    .scroller-body{
        position: fixed;
        right: 0px;
        width: 10px;
        background: #e92323;
        cursor: pointer;
    }
</style>
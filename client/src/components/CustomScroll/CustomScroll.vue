<template>

    <div ref="wrapperHtmlRef" :class="{'scroll-main-wrapper': !body}">
        
        <slot></slot>

        <div v-if="showScrollComputed" ref="scrollerWrapHtmlRef" :class="{'scroll-wrap-body': body, 'scroll-wrap': !body}">
            <div ref="scrollerHtmlRef" :class="{'scroller-body': body, 'scroller': !body}"></div>
        </div>
    </div>

</template>



<script lang="ts">
    import { defineComponent, ref, Ref, onMounted, computed, watch } from 'vue';

    export default defineComponent({

        props: {
            body: {
                type   : Boolean,
                default: false,
            },

            showScroll: {
                type   : Boolean,
                default: true,
            }
        },

        emits: ['update:show-scroll'],

        setup(props, { emit }){

            const showScrollComputed = computed({
                get(): boolean {
                    return props.showScroll;
                },
                set(newVal: boolean): void {
                    emit('update:show-scroll', newVal);
                }
            });


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
                    wrapperHeight.value = wrapperHtml.scrollHeight;
                }
            };

            const countScreenHeight = () => {
                if(props.body){
                    screenHeight.value = document.documentElement.clientHeight;
                } else {
                    screenHeight.value = wrapperHtml.clientHeight;
                }
            };

            const countScrollerHeight = () => {
                scrollerHeight.value = (screenHeight.value / wrapperHeight.value) * 100;
                scrollerHtml.style.height = scrollerHeight.value + '%';
            };

            const countScrollTop = (scrollTop: number) => {
                let newTop: number = (scrollTop * screenHeight.value) / wrapperHeight.value;
                scrollerHtml.style.top = (newTop) + 'px';
            }

            const scrollHandler = () => {

                if(props.body){
                    window.addEventListener('scroll', () => {
                        countScrollTop(window.scrollY);
                    });
                } else {
                    wrapperHtml.addEventListener('scroll', () => {
                        if(!props.body) scrollerWrapHtml.style.top = wrapperHtml.scrollTop + 'px';
                        countScrollTop(wrapperHtml.scrollTop);
                    });
                } 
            };

            watch(scrollerHtmlRef, (value: any) => {
                if(value == null) {
                    if(props.body) document.body.style.overflowY = 'hidden';
                    else           wrapperHtml.style.overflowY = 'hidden';
                    return;
                }

                if(props.body) document.body.style.overflowY = 'scroll';
                else           wrapperHtml.style.overflowY = 'scroll';

                scrollerHtml = scrollerHtmlRef.value as HTMLDivElement;
                if(!props.body) scrollerWrapHtml = scrollerWrapHtmlRef.value as HTMLDivElement;

                countScrollerHeight();
                scrollHandler();

                if(!props.body) scrollerWrapHtml.style.top = wrapperHtml.scrollTop + 'px';
                countScrollTop(props.body ? window.scrollY : wrapperHtml.scrollTop);
            });


            onMounted(() => {
                wrapperHtml      = wrapperHtmlRef.value as HTMLDivElement;
                scrollerHtml     = scrollerHtmlRef.value as HTMLDivElement;
                scrollerWrapHtml = scrollerWrapHtmlRef.value as HTMLDivElement;

                setTimeout(() => {
                    countWrapperHeight();
                    countScreenHeight();
                    countScrollerHeight();
                    scrollHandler();
                    countScrollTop(props.body ? window.scrollY : wrapperHtml.scrollTop);
                }, 0);

                const resizeObserver = new ResizeObserver(entries => {
                    countWrapperHeight();
                    countScreenHeight();
                    countScrollerHeight();
                    scrollHandler();
                    countScrollTop(props.body ? window.scrollY : wrapperHtml.scrollTop);
                });

                const elem = props.body ? document.body : wrapperHtml;

                resizeObserver.observe(elem);
            });

            return {
                wrapperHtmlRef,
                scrollerHtmlRef,
                scrollerWrapHtmlRef,

                showScrollComputed
            }
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
        scrollbar-width: 0;  /* Firefox */
    }

    .scroll-main-wrapper{
        max-height: 384px;
        overflow-y: scroll;
        position: relative;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .scroll-main-wrapper::-webkit-scrollbar {
        display: none;
    }
    
    .scroll-wrap-body{
        width: 10px;
        height: 100vh;
        position: fixed;
        background: #dad3d3;
        top: 0px;
        right: 0px;
        z-index: 2;
    }

    .scroll-wrap{
        width: 10px;
        height: 100%;
        position: absolute;
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
        z-index: 2;
    }

    .scroller{
        position: absolute;
        right: 0px;
        width: 10px;
        background: #e92323;
        cursor: pointer;
    }
</style>
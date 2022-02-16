<template>

    <div ref="wrapperHtmlRef" :class="{'scroll-main-wrapper': !body}">
        
        <slot></slot>

        <div v-if="showScrollComputed" ref="scrollerWrapHtmlRef" :class="{'scroll-wrap-body': body, 'scroll-wrap': !body}">
            <div ref="scrollerHtmlRef" @mousedown="mouseDown" @mouseup="mouseUp"  :class="{'scroller-body': body, 'scroller': !body}"></div>
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
                isDragging    : Ref<boolean> = ref(false),
                topValue      : Ref<number>  = ref(0),
                scrollerHeight: Ref<number>  = ref(0), //* in percent
                wrapperHeight : Ref<number>  = ref(0),
                screenHeight  : Ref<number>  = ref(0);


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
                topValue.value = (scrollTop * screenHeight.value) / wrapperHeight.value;
                scrollerHtml.style.top = (topValue.value) + 'px';
            }

            const scrollHandler = () => {

                if(props.body){
                    window.addEventListener('scroll', () => {
                        if(!isDragging.value) countScrollTop(window.scrollY);
                    });
                } else {
                    wrapperHtml.addEventListener('scroll', () => {
                        if(isDragging.value) return;
                        if(!props.body) scrollerWrapHtml.style.top = wrapperHtml.scrollTop + 'px';
                        countScrollTop(wrapperHtml.scrollTop);
                    });
                } 
            };

            const mouseDown = (e: MouseEvent) => {
                let startY: number = e.clientY;
                
                isDragging.value = true;

                document.onmousemove = (ev: MouseEvent) => {
                    e.stopPropagation();
                    e.preventDefault();

                    let endY  : number = ev.clientY;
                    let deltaY: number = endY - startY;

                    topValue.value += deltaY;
                    startY = ev.clientY;

                    scrollerHtml.style.top = (topValue.value) + 'px';

                    let top: number = (topValue.value * wrapperHeight.value) / screenHeight.value;
                    
                    if(props.body) {
                        window.scrollTo(0, top);
                    } else {
                        if(!props.body) scrollerWrapHtml.style.top = wrapperHtml.scrollTop + 'px';
                        wrapperHtml.scrollTo({top: top});
                    }
                }

                document.onmouseup = (e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    isDragging.value = false;
                    document.onmousemove = null;
                }
            }

            const mouseUp = (e: MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();

                isDragging.value = false;
                document.onmousemove = null;
            }


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

                showScrollComputed,

                mouseDown,
                mouseUp,
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
        scrollbar-width: none;  /* Firefox */
    }

    /*
    html {
        -ms-overflow-style: none;
        scrollbar-width: none;  
    }
    */

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
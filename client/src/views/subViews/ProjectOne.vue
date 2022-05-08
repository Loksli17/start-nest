
<template>

    <div class="mt-8 px-10 ">
        
        <div class="grid gap-2 auto-cols-max grid-flow-col">
            <div class="p-3 bg-gray-200 cursor-pointer rounded text-lg" v-for="(btn, index) in actionButtons" :key="btn.action" @click="actionBtnClick(index)" :class="{'bg-blue-300': index == activeIndex}">
                {{btn.action}}
            </div>
        </div>

        <div class="mt-5">

            <canvas ref="canvasRef"
                width="1300"
                height="700"
                @click="canvasClick" 
                @mousedown="canvasMouseDown"
                @mouseup="canvasMouseUp"
                @mousemove="canvasMouseMove"
                @mousedown.middle="wheelClickDown"
                @mouseup.middle="wheelClickUp"
                @wheel="mouseWheel"
                class=" border-2 ">
            </canvas>
            
        </div>
    </div>
</template>


<script lang="ts">

    import CanvasState, { ActionButton }            from '@/engine/CanvasState';
    import { defineComponent, Ref, ref, onMounted } from 'vue';



    export default defineComponent({
        
        setup() {
            
            const actionButtons: Array<ActionButton> = [
                {
                    action: "move",
                    icon  : 'move.png',
                },
                {
                    action: "frame",
                    icon  : 'frame.png',
                },
                {
                    action: "rect",
                    icon  : 'rect.png',
                },
                {
                    action: "text",
                    icon  : 'text.png',
                }
            ];

            let activeIndex: Ref<number> = ref(0);

            let 
                canvasState: CanvasState,
                canvasRef = ref(null);


            const 
                actionBtnClick = (index: number) => {
                    activeIndex.value = index;
                },
                
                canvasClick = (e: MouseEvent) => {
                    canvasState.click(actionButtons[activeIndex.value], e);
                },

                canvasMouseDown = (e: MouseEvent) => {
                    canvasState.onMouseDown(actionButtons[activeIndex.value], e);
                },

                canvasMouseMove = (e: MouseEvent) => {
                    canvasState.onMouseMove(actionButtons[activeIndex.value], e);
                },

                canvasMouseUp = (e: MouseEvent) => {
                    canvasState.onMouseUp(actionButtons[activeIndex.value], e);
                    activeIndex.value = 0;
                },

                wheelClickDown = (e: MouseEvent) => {
                    canvasState.wheelClickDown(actionButtons[activeIndex.value], e);
                },

                wheelClickUp = (e: MouseEvent) => {
                    canvasState.wheelClickUp(actionButtons[activeIndex.value], e);
                },

                mouseWheel = (e: WheelEvent) => {
                    canvasState.wheelScroll(actionButtons[activeIndex.value], e);
                };


            onMounted(() => {
                let canvas: HTMLCanvasElement = canvasRef.value as any;
                canvasState = new CanvasState(canvas);
            });


            return {
                actionButtons,

                actionBtnClick,
                activeIndex,

                canvasClick,
                canvasRef,

                canvasMouseDown,
                canvasMouseUp,
                canvasMouseMove,
                wheelClickDown,
                wheelClickUp,
                mouseWheel,
            }
        },
    });
</script>

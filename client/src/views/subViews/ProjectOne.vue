
<template>

    <div class="mt-8 px-10 ">
        
        <div class="grid gap-2 auto-cols-max grid-flow-col">
            <div class="p-3 bg-gray-200 cursor-pointer rounded text-lg" v-for="(btn, index) in actionButtons" :key="btn.id" @click="actionBtnClick(index)" :class="{'bg-blue-300': index == activeIndex}">
                {{btn.action}}
            </div>
        </div>

        <div class="mt-5">
            <canvas @click="canvasClick" class=" border-2 w-full h-canvas"></canvas>
        </div>
    </div>
</template>


<script lang="ts">
    import { defineComponent, Ref, ref } from 'vue';


    interface ActionButton {
        action: string;
        icon  : string;
    }

    
    class Rect {

        public render(ctx: any): void{
            console.log(ctx);
        }
    }


    class Drawer {

        private ctx;

        constructor(ctx: any) {
            this.ctx = ctx;
        }

        public render(){
            const rect: Rect = new Rect();
            rect.render(this.ctx);
        }
    }

    
    class UserCanvasAction {

        private static drawer: Drawer = new Drawer("ctx");

        public static click(actionBtn: ActionButton): void {
            console.log('canvas click!');
        } 
    }



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


            const 
                actionBtnClick = (index: number) => {
                    activeIndex.value = index;
                },
                
                canvasClick = () => {
                    UserCanvasAction.click(actionButtons[activeIndex.value]);
                };


            return {
                actionButtons,

                actionBtnClick,
                activeIndex,

                canvasClick
            }
        },
    })
</script>

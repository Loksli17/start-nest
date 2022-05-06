
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
                class=" border-2 ">
            </canvas>
            
        </div>
    </div>
</template>


<script lang="ts">

    import { defineComponent, Ref, ref, onMounted } from 'vue';
    import methodDecoratorFactory                   from '@/utils/methodDecoratorFactory';


    interface ActionButton {
        action: string;
        icon  : string;
    }


    const 
        isDedicated = () => {
            return methodDecoratorFactory.createDecoratorAfter((data: {systemPoints: Array<SystemPoint>, ctx: any}) => {
                
                data.systemPoints.forEach((point: SystemPoint) => {
                    point.render();
                });

                return data;
            });
        },

        drawSystemBorderRect = () => {
            return methodDecoratorFactory.createDecoratorAfter((data: {systemPoints: Array<SystemPoint>, ctx: CanvasRenderingContext2D}) => {

                if(data.systemPoints.length == 0) return data;
                
                data.ctx.strokeStyle = "#0e0efe";

                data.ctx.strokeRect(
                    data.systemPoints[0].x, 
                    data.systemPoints[0].y,
                    data.systemPoints[1].x - data.systemPoints[0].x,
                    data.systemPoints[1].y - data.systemPoints[0].y,
                );

                return data;
            });
        }


    class Point {

        constructor (x: number, y: number){
            this.x = x;
            this.y = y;
        }

        public x = 0;
        public y = 0;

        public move(x: number, y: number) {
            this.x += x;
            this.y += y;
        }
    }


    class SystemPoint extends Point {

        private ctx;
        private gap = 6;

        constructor(x: number, y: number, ctx: any){
            super(x, y);
            this.ctx = ctx;
        }

        public render(){
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(this.x - this.gap / 2, this.y - this.gap / 2, this.gap, this.gap);
            this.ctx.strokeStyle = "#0e0efe";
            this.ctx.strokeRect(this.x - (this.gap / 2) - 1, this.y - (this.gap / 2) - 1, this.gap + 1, this.gap + 1);
        }
    }


    abstract class Shape {
        public isDedicated = false;
        protected points: Array<Point> = [];

        public abstract render(ctx: any): void;
        public abstract move(x: number, y: number): void;
    }


    
    class Rect extends Shape {

        public isFill = true;


        public setFirstPoint(p: Point) {
            if(this.points[0] != undefined) this.points[0] = p;
            this.points.push(p);
        }

        public setSecondPoint(p: Point) {
            if(this.points[0] == undefined) throw new Error('not use setSecondPoint before setFirstPoint')
            if(this.points[1] != undefined) { this.points[1] = p; return; }
            this.points.push(p);
        }


        @isDedicated()
        @drawSystemBorderRect()
        public render(ctx: any): {systemPoints: Array<SystemPoint>, ctx: any} {
            
            if(ctx == undefined){
                throw new Error("CTX is null. Why?");
            }
            
            if(this.isFill){
                ctx.fillStyle = "#ccc";
                ctx.fillRect(this.points[0].x, this.points[0].y, this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y); 
            }else{
                ctx.strokeStyle = "#ccc";
                ctx.strokeRect(this.points[0].x, this.points[0].y, this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y);
            }

            let systemPoints: SystemPoint[] = [];

            if(this.isDedicated) {
                systemPoints.push(new SystemPoint(this.points[0].x, this.points[0].y, ctx));
                systemPoints.push(new SystemPoint(this.points[1].x, this.points[1].y, ctx));
                systemPoints.push(new SystemPoint(this.points[0].x, this.points[1].y, ctx));
                systemPoints.push(new SystemPoint(this.points[1].x, this.points[0].y, ctx));
            }

            return {systemPoints, ctx: ctx};
        }


        public move(x: number, y: number) {
            this.points.forEach((point: Point) => {
                point.move(x, y);
            })
        }
    }


    class Drawer {

        private ctx;

        constructor(ctx: any) {
            this.ctx = ctx;
        }

        public render(scaleCoef: number, shapes: Array<Shape>){
            this.clear();
            shapes.forEach((shape: Shape) => shape.render(this.ctx));
        }

        private clear(): void {
            if(this.ctx == undefined) return;
            this.ctx.clearRect(0, 0, 2000, 1200);
            // this.ctx.fillStyle = '#fff';
            // this.ctx.fillRect(0, 0, 2000, 1200);
        }
    }

    
    class CanvasState {

        private left = 0;
        private top  = 0;

        private scaleCoef      = 1; 
        private isDrawing      = false;
        private isWheelMoving  = false;

        private drawer          : Drawer       = new Drawer("ctx");
        private shapes          : Array<Shape> = [];
        private dedicatedShapes : Array<Shape> = [];
        private wheelMovingEvent: MouseEvent | undefined; 
    

        private currentShape: Shape | undefined;

        constructor(canvas: HTMLCanvasElement){
            this.drawer = new Drawer(canvas.getContext("2d"));
            this.left = canvas.getBoundingClientRect().left;
            this.top  = canvas.getBoundingClientRect().top;
        }

        private accoiationsShapeStateInit: Record<string, (e: MouseEvent) => void> = {
            'rect' : (e) => this.rectHandlerInit(e),
            'frame': (e) => this.frameHandler(e),
            'text' : (e) => this.textHandler(e),
        };

        private accoiationsShapeStateMove: Record<string, (e: MouseEvent) => void> = {
            'rect' : (e) => this.rectHandlerMove(e),
            'frame': (e) => this.frameHandler(e),
            'text' : (e) => this.textHandler(e),
        };

        private accoiationsShapePushState: Record<string, (e: MouseEvent) => void> = {
            'rect' : (e) => this.rectHandlerPush(e),
            'frame': (e) => this.frameHandler(e),
            'text' : (e) => this.textHandler(e),
        };


        private normalX(x: number): number {
            return x - this.left;
        }

        private normalY(y: number): number {
            return y - this.top;
        }

        private normalMovingDeltaWidth(x: number): number {

            const wScreen = window.innerWidth;
            const wCanvas = 1300;

            const result = (x * wCanvas) / wScreen;
            
            return result;
        }


        private normalMovingDeltaHeight(y: number): number {

            const hScreen = window.innerHeight;
            const hCanvas = 700;

            const result = (y * hCanvas) / hScreen;
            
            return result;
        }

        
        private rectHandlerInit(e: MouseEvent): void {
            this.currentShape = new Rect();
            (this.currentShape as Rect).setFirstPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
        }

        private rectHandlerMove(e: MouseEvent): void {
            (this.currentShape as Rect).setSecondPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
        }

        private rectHandlerPush(e: MouseEvent): void {
            (this.currentShape as Rect).isFill = true;
        }


        private textHandler(e: MouseEvent): void {
            console.log(this.drawer);
            // this.drawer.renderShape(rect);
        }

        private frameHandler(e: MouseEvent): void {
            console.log(this.drawer);
            // this.drawer.renderShape(rect);
        }



        public onMouseDown(actionBtn: ActionButton, e: MouseEvent): void {
            if(actionBtn.action == 'move'){
                console.log('move');
            } else {
                this.isDrawing = true;
                this.accoiationsShapeStateInit[actionBtn.action](e);
                this.currentShape!.isDedicated = true;
            }
        }

        public onMouseUp(actionBtn: ActionButton, e: MouseEvent): void {

           if(actionBtn.action == 'move'){
                console.log('move');
            } else {
                // this.currentShape!.isDedicated = false;

                this.accoiationsShapePushState[actionBtn.action](e);
                this.shapes.push(this.currentShape!);
                this.isDrawing = false;

                this.drawer.render(this.scaleCoef, this.shapes);
            }
        }

        public onMouseMove(actionBtn: ActionButton, e: MouseEvent): void {

            if (actionBtn.action == 'move' && !this.isWheelMoving) {
                console.log('move');
            } else if(actionBtn.action == 'move' && this.isWheelMoving) {

                const deltaX = this.normalMovingDeltaWidth(e.clientX - this.wheelMovingEvent!.clientX);
                const deltaY = this.normalMovingDeltaHeight(e.clientY - this.wheelMovingEvent!.clientY);

                console.log(deltaX, deltaY);

                this.shapes.forEach((shape: Shape) => shape.move(deltaX, deltaY));
                this.drawer.render(this.scaleCoef, this.shapes);

                this.wheelMovingEvent = e;
            } else {

                if(!this.isDrawing){
                    return
                }

                this.accoiationsShapeStateMove[actionBtn.action](e);

                this.shapes.push(this.currentShape!);
                this.drawer.render(this.scaleCoef, this.shapes);
                this.shapes.pop();
            } 
        }

        public click(actionBtn: ActionButton, e: MouseEvent): void {
            
            this.shapes.forEach((shape: Shape) => {
                shape.isDedicated = false;
            });

            this.drawer.render(this.scaleCoef, this.shapes);
        }


        public wheelClickDown(actionBtn: ActionButton, e: MouseEvent): void {

            console.log('middleDown')

            this.isWheelMoving    = true;
            this.wheelMovingEvent = e;
        }


        public wheelClickUp(actionBtn: ActionButton, e: MouseEvent): void {

            console.log('middleUp')

            this.isWheelMoving    = false;
            this.wheelMovingEvent = e;
        }

        // public static mouseWheel(){
        //     UserCanvasAction.scaleCoef = 2;
        //     UserCanvasAction.drawer.render(UserCanvasAction.scaleCoef);
        // }
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
                }


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
            }
        },
    });
</script>

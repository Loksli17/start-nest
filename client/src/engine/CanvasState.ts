import Drawer from "./Drawer";
import { Point } from "./Point";
import Rect from "./shape/Rect";
import Shape from "./shape/Shape";


export interface ActionButton {
    action: string;
    icon  : string;
}
    

export default class CanvasState {

    private left = 0;
    private top  = 0;

    private scaleCoef     = 1; 
    private isSelection   = false;
    private isDrawing     = false;
    private isWheelMoving = false;
    private isClickUp     = false;

    private drawer          : Drawer                 = new Drawer("ctx");
    private shapes          : Array<Shape>           = [];
    private dedicatedShapes : Array<Shape>           = [];
    private selectionRect   : Rect                   = new Rect();
    private wheelMovingEvent: MouseEvent | undefined = undefined;


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
            
            this.isSelection = true;
            this.selectionRect.setFirstPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
            this.selectionRect.isSelection = true;

        } else {
            this.isDrawing = true;
            this.accoiationsShapeStateInit[actionBtn.action](e);
            this.currentShape!.isDedicated = true;
        }
    }

    public onMouseUp(actionBtn: ActionButton, e: MouseEvent): void {

        if(actionBtn.action == 'move'){
            if(this.isSelection) {
                this.isSelection = false;
            }
        } else {
            // this.currentShape!.isDedicated = false;

            this.accoiationsShapePushState[actionBtn.action](e);
            this.shapes.push(this.currentShape!);
            this.isDrawing = false;

            this.drawer.render(this.shapes);

            this.isClickUp = true;
        }
    }

    public onMouseMove(actionBtn: ActionButton, e: MouseEvent): void {

        if (actionBtn.action == 'move' && !this.isWheelMoving) {
            
            if(this.isSelection){
                this.selectionRect.setSecondPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
                this.shapes.push(this.selectionRect);

                this.shapes.forEach((shape: Shape, index: number) => {
                    if(index == this.shapes.length - 1) return
                    console.log(shape.intersectionRect(this.selectionRect));
                    if(shape.intersectionRect(this.selectionRect)) shape.isDedicated = true;
                    else shape.isDedicated = false;
                });

                console.log(this.shapes)

                this.drawer.render(this.shapes);
                this.shapes.pop();
            }

        } else if(actionBtn.action == 'move' && this.isWheelMoving) {

            const deltaX = this.normalMovingDeltaWidth(e.clientX - this.wheelMovingEvent!.clientX);
            const deltaY = this.normalMovingDeltaHeight(e.clientY - this.wheelMovingEvent!.clientY);

            console.log(deltaX, deltaY, this.scaleCoef);

            this.shapes.forEach((shape: Shape) => shape.move(deltaX, deltaY));
            this.drawer.render(this.shapes);

            this.wheelMovingEvent = e;
        } else {

            if(!this.isDrawing){
                return
            }

            this.accoiationsShapeStateMove[actionBtn.action](e);

            this.shapes.push(this.currentShape!);
            this.drawer.render(this.shapes);
            this.shapes.pop();
        } 
    }

    public click(actionBtn: ActionButton, e: MouseEvent): void {

        this.shapes.forEach((shape: Shape) => {
            shape.isDedicated = false;
            console.log(shape.intersectionPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY))))
            if (shape.intersectionPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)))) shape.isDedicated = true;
        });
 
        if(this.isClickUp) {
            this.shapes[this.shapes.length - 1].isDedicated = true;
            this.isClickUp = false;
        }

        console.log('click', this.shapes);

        this.drawer.render(this.shapes);
    }


    public wheelClickDown(actionBtn: ActionButton, e: MouseEvent): void {
        this.isWheelMoving    = true;
        this.wheelMovingEvent = e;
    }


    public wheelClickUp(actionBtn: ActionButton, e: MouseEvent): void {
        this.isWheelMoving    = false;
        this.wheelMovingEvent = e;
    }

    
    public wheelScroll(actionBtn: ActionButton, e: WheelEvent): void {
        const mouseX1 = this.normalMovingDeltaWidth(e.clientX);
        const mouseY1 = this.normalMovingDeltaHeight(e.clientY);

        if(e.deltaY == 100) this.scaleCoef = this.scaleCoef -= 0.1;
        else this.scaleCoef += 0.1;

        const mouseX2 = this.normalMovingDeltaWidth(e.clientX);
        const mouseY2 = this.normalMovingDeltaHeight(e.clientY);
            
        this.drawer.scale(this.shapes, this.scaleCoef);
        // this.drawer.move(this.shapes, {x: mouseX2 - mouseX1, y: mouseY2 - mouseY1});
        this.drawer.render(this.shapes);

        console.log(this.scaleCoef, e.deltaY);
    }

    // public static mouseWheel(){
    //     UserCanvasAction.scaleCoef = 2;
    //     UserCanvasAction.drawer.render(UserCanvasAction.scaleCoef);
    // }
}
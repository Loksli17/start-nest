import Drawer from "./Drawer";
import { Point } from "./Point";
import { Line } from "./shape/Line";
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
    private isClickDown   = false;

    private isResizing: 'top' | 'left' | 'bottom' | 'right' | 'none' | undefined = undefined;

    private drawer          : Drawer                 = new Drawer("ctx");
    private shapes          : Array<Shape>           = [];
    private dedicatedShapes : Array<Shape>           = [];
    private selectionRect   : Rect                   = new Rect();
    private wheelMovingEvent: MouseEvent | undefined = undefined;

    private dedicatedMovingEvent: MouseEvent | undefined;

    private currentShape: Shape | undefined;

    constructor(canvas: HTMLCanvasElement){
        this.drawer = new Drawer(canvas.getContext("2d"));
        this.left = canvas.getBoundingClientRect().left;
        this.top  = canvas.getBoundingClientRect().top;
    }

    private assoiationsShapeStateInit: Record<string, (e: MouseEvent) => void> = {
        'rect' : (e) => this.rectHandlerInit(e),
        'line' : (e) => this.lineHanderInit(e),
        'frame': (e) => this.frameHandler(e),
        'text' : (e) => this.textHandler(e),
    };

    private assoiationsShapeStateMove: Record<string, (e: MouseEvent) => void> = {
        'rect' : (e) => this.rectHandlerMove(e),
        'line' : (e) => this.lineHandlerMove(e),
        'frame': (e) => this.frameHandler(e),
        'text' : (e) => this.textHandler(e),
    };

    private assoiationsShapePushState: Record<string, (e: MouseEvent) => void> = {
        'rect' : (e) => this.rectHandlerPush(e),
        'line' : (e) => this.lineHandlerPush(e),
        'frame': (e) => this.frameHandler(e),
        'text' : (e) => this.textHandler(e),
    };

    private associationsShapeResize: Record<string, (e: MouseEvent, shape: Shape, status: 'top' | 'left' | 'bottom' | 'right' | 'none') => void> = {
        'rect' : (e, shape, status) => this.rectHandlerResize(e, shape, status),
        'frame': (e, status) => this.frameHandler(e),
        'text' : (e, status) => this.textHandler(e),
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


    private lineHanderInit(e: MouseEvent): void {
        this.currentShape = new Line();
        (this.currentShape as Line).setFirstPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
    }

    private lineHandlerMove(e: MouseEvent): void {
        (this.currentShape as Line).setSecondPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
    }

    private lineHandlerPush(e: MouseEvent): void {
        console.log('line');
        // (this.currentShape as Rect).isFill = true;
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
    
    private rectHandlerResize(e: MouseEvent, rect: Shape, status: 'top' | 'left' | 'bottom' | 'right' | 'none'): void {

        const point1: Point = (rect as Rect).getFirstPoint();
        const point2: Point = (rect as Rect).getSecondPoint();

        switch (status) {
            case 'left':
                point1.x = this.normalX(e.clientX);
                (rect as Rect).setFirstPoint(point1);
                break;
            case 'right':
                point2.x = this.normalX(e.clientX);
                (rect as Rect).setSecondPoint(point2);
                break;
            case 'bottom':
                point2.y = this.normalY(e.clientY);
                (rect as Rect).setSecondPoint(point2);
                break;
            case 'top':
                point1.y = this.normalY(e.clientY);
                (rect as Rect).setFirstPoint(point1);
                break;
        }
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

        this.isClickDown = true;
        
        if(actionBtn.action == 'move'){

            this.dedicatedMovingEvent = e;

            // this.isSelection = true;
            // this.selectionRect.setFirstPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));
            // this.selectionRect.isSelection = true;

        } else if(this.dedicatedShapes.length == 0 && actionBtn.action != 'move') {
            this.isDrawing = true;
            this.assoiationsShapeStateInit[actionBtn.action](e);
            this.currentShape!.isDedicated = true;
        } 
    }

    public onMouseUp(actionBtn: ActionButton, e: MouseEvent): void {

        this.isClickDown = false;

        if(this.isResizing) {
            this.isResizing = undefined;
            document.body.style.cursor = "default";
            this.dedicatedShapes.forEach((shape) => shape.normalPointsShape())
        }

        if(actionBtn.action == 'move'){
            if(this.isSelection) {
                this.isSelection = false;
            }

            if(this.dedicatedShapes.length > 0) this.dedicatedShapes = [];
        } else {
            // this.currentShape!.isDedicated = false;

            this.assoiationsShapePushState[actionBtn.action](e);
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

                this.drawer.render(this.shapes);
                this.shapes.pop();
            }

            if(this.dedicatedShapes.length > 0 && this.isClickDown && this.isResizing) {

                this.dedicatedShapes.forEach((shape: Shape) => {
                    if(shape instanceof Rect){
                        this.associationsShapeResize['rect'](e, shape, this.isResizing!);
                    }
                });

                this.drawer.render(this.shapes);

            } else if(this.dedicatedShapes.length > 0 && this.isClickDown && !this.isResizing) {

                const deltaX = e.clientX - this.dedicatedMovingEvent!.clientX;
                const deltaY = e.clientY - this.dedicatedMovingEvent!.clientY;

                this.dedicatedShapes.forEach((shape: Shape) => {
                    shape.move(deltaX, deltaY);
                });

                this.drawer.render(this.shapes);

                this.dedicatedMovingEvent = e;
            } else if(this.dedicatedShapes.length > 0 && !this.isClickDown ) {

                this.dedicatedShapes.forEach((shape: Shape) => {
                    const borderInter = shape.intersectionPointWithBorder(new Point(this.normalX(e.clientX), this.normalY(e.clientY)));

                    if(borderInter.inter == true) {
                        document.body.style.cursor = (borderInter.status == "left" || borderInter.status == "right") ? "ew-resize" : "ns-resize";
                        this.isResizing = borderInter.status;
                    } else {
                        document.body.style.cursor = "default";
                        this.isResizing = undefined;
                    }
                     
                })
            }

        } else if(actionBtn.action == 'move' && this.isWheelMoving) {

            const deltaX = e.clientX - this.wheelMovingEvent!.clientX;
            const deltaY = e.clientY - this.wheelMovingEvent!.clientY;

            this.shapes.forEach((shape: Shape) => shape.move(deltaX, deltaY));
            this.drawer.render(this.shapes);

            this.wheelMovingEvent = e;
        } else {

            if(!this.isDrawing){
                return
            }

            this.assoiationsShapeStateMove[actionBtn.action](e);

            this.shapes.push(this.currentShape!);
            this.drawer.render(this.shapes);
            this.shapes.pop();
        } 
    }

    public click(actionBtn: ActionButton, e: MouseEvent): void {

        this.dedicatedShapes = [];
        this.shapes.forEach((shape: Shape) => shape.isDedicated = false);

        for(const [index, shape] of this.shapes.entries()){
            if (shape.intersectionPoint(new Point(this.normalX(e.clientX), this.normalY(e.clientY)))) {
                shape.isDedicated = true;
                this.dedicatedShapes.push(shape);
                break;
            }
        }
 
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
        // const mouseX1 = this.normalMovingDeltaWidth(e.clientX);
        // const mouseY1 = this.normalMovingDeltaHeight(e.clientY);

        // if(e.deltaY == 100) this.scaleCoef = this.scaleCoef -= 0.1;
        // else this.scaleCoef += 0.1;

        // const mouseX2 = this.normalMovingDeltaWidth(e.clientX);
        // const mouseY2 = this.normalMovingDeltaHeight(e.clientY);
            
        // this.drawer.scale(this.shapes, this.scaleCoef);
        // // this.drawer.move(this.shapes, {x: mouseX2 - mouseX1, y: mouseY2 - mouseY1});
        // this.drawer.render(this.shapes);

        console.log(this.scaleCoef, e.deltaY);
    }

    // public static mouseWheel(){
    //     UserCanvasAction.scaleCoef = 2;
    //     UserCanvasAction.drawer.render(UserCanvasAction.scaleCoef);
    // }
}
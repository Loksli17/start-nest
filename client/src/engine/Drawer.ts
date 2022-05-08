import Rect  from "./shape/Rect";
import Shape from "./shape/Shape";


export default class Drawer {

    private ctx;

    constructor(ctx: any) {
        this.ctx = ctx;
    }

    public render(shapes: Array<Shape>) {
        this.clear();
        shapes.forEach((shape: Shape) => shape.render(this.ctx));
    }

    public renderSelection(rect: Rect): void {
        rect.render(this.ctx);
    }

    public scale(shapes: Array<Shape>, scaleCoef = 1) {
        shapes.forEach((shape: Shape) => shape.scale(scaleCoef));
    } 

    public move(shapes: Array<Shape>, coords: {x: number, y: number}){
        shapes.forEach((shape: Shape) => shape.move(coords.x, coords.y));
    }

    private clear(): void {
        if(this.ctx == undefined) return;
        this.ctx.clearRect(0, 0, 2000, 1200);
        // this.ctx.fillStyle = '#fff';
        // this.ctx.fillRect(0, 0, 2000, 1200);
    }
}
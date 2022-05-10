import { Point, SystemPoint } from "../Point";
import { isDedicated }        from "../utils/decorators";
import Shape                  from "./Shape";



export class Line extends Shape {

    public setFirstPoint(p: Point) {
        if(this.points[0] != undefined) { this.points[0] = p; return; }
        this.points.push(p);
    }

    public setSecondPoint(p: Point) {
        if(this.points[0] == undefined) throw new Error('not use setSecondPoint before setFirstPoint')
        if(this.points[1] != undefined) { this.points[1] = p; return; }
        this.points.push(p);
    }

    public getFirstPoint(): Point {
        return this.points[0];
    }

    public getSecondPoint(): Point {
        return this.points[1];
    }

    @isDedicated()
    public render(ctx: CanvasRenderingContext2D): { systemPoints: Array<SystemPoint>, ctx: any } {

        if(ctx == undefined){
            throw new Error("CTX is null. Why?");
        }

        const normalPoints = this.normalPoints(this.points);

        // ctx.lineWidth   = this.width;
        // ctx.strokeStyle = this.color;

        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);    
        ctx.lineTo(this.points[1].x, this.points[1].y);

        ctx.stroke();

        const systemPoints: SystemPoint[] = [];

        if(this.isDedicated) {
            systemPoints.push(new SystemPoint(normalPoints[0].x, normalPoints[0].y, ctx));
            systemPoints.push(new SystemPoint(normalPoints[1].x, normalPoints[1].y, ctx));
        }

        return {
            systemPoints,
            ctx: ctx,
        }
    }

    public normalPointsShape(): void {
        throw new Error("Method not implemented.");
    }

    public move(x: number, y: number): void {

        this.points.forEach((point: Point) => {
            point.move(x, y);
        });
    }

    public scale(scaleCoef: number): void {
        throw new Error("Method not implemented.");
    }

    public intersectionRect(shape: Shape): boolean {
        return false;
    }

    public intersectionPoint(point: Point): boolean {
        
        const left  = (point.x - this.points[0].x) / (this.points[1].x - this.points[0].x);
        const right = (point.y - this.points[0].y) / (this.points[1].y - this.points[0].y)

        console.log(left, right);

        return Math.abs(left - right) < 0.075;
    }

    public intersectionPointWithBorder(point: Point): { inter: boolean; status: "top" | "bottom" | "left" | "right" | "none"; } {
        return {inter: false, status: 'none'};
    }
}
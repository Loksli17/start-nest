import { Point, SystemPoint }                from "../Point";
import { drawSystemBorderRect, isDedicated } from "../utils/decorators";
import Shape                                 from "./Shape";



export default class Rect extends Shape {

    public isFill      = true;
    public isSelection = false;

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

        const normalPoints = this.normalPoints(this.points);
        
        if(this.isFill && !this.isSelection){
            ctx.fillStyle = "#ccc";
            ctx.fillRect(normalPoints[0].x, normalPoints[0].y, normalPoints[1].x - normalPoints[0].x, normalPoints[1].y - normalPoints[0].y); 
        } else if(this.isSelection) {
            ctx.fillStyle = "rgba(20, 60, 120, 0.5)";
            ctx.fillRect(normalPoints[0].x, normalPoints[0].y, normalPoints[1].x - normalPoints[0].x, normalPoints[1].y - normalPoints[0].y);
            ctx.strokeStyle = "rgba(220, 40, 230)";
            ctx.strokeRect(normalPoints[0].x, normalPoints[0].y, normalPoints[1].x - normalPoints[0].x, normalPoints[1].y - normalPoints[0].y);
        } else {
            ctx.strokeStyle = "#ccc";
            ctx.strokeRect(normalPoints[0].x, normalPoints[0].y, normalPoints[1].x - normalPoints[0].x, normalPoints[1].y - normalPoints[0].y);
        }

        const systemPoints: SystemPoint[] = [];

        if(this.isDedicated) {
            systemPoints.push(new SystemPoint(normalPoints[0].x, normalPoints[0].y, ctx));
            systemPoints.push(new SystemPoint(normalPoints[1].x, normalPoints[1].y, ctx));
            systemPoints.push(new SystemPoint(normalPoints[0].x, normalPoints[1].y, ctx));
            systemPoints.push(new SystemPoint(normalPoints[1].x, normalPoints[0].y, ctx));
        }

        return {systemPoints, ctx: ctx};
    }


    public move(x: number, y: number) {
        this.points.forEach((point: Point) => {
            point.move(x, y);
        })
    }

    public scale(scaleCoef: number) {
        this.scaleCoef = scaleCoef;
    }

    // ! it's can be if rect parrallels with Axios
    public intersectionRect(rect: Rect): boolean {

        const a1: Point = this.points[0].x < this.points[1].x ? this.points[0] : this.points[1];
        const a2: Point = this.points[0].x > this.points[1].x ? this.points[0] : this.points[1];

        return !(
            a1.y > rect.points[1].y 
            || a2.y < rect.points[0].y
            || a2.x < rect.points[0].x
            || a1.x > rect.points[1].x
        );
    }
}
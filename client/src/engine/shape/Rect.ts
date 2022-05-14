import { Point, SystemPoint }                from "../Point";
import { drawSystemBorderRect, isDedicated } from "../utils/decorators";
import Shape                                 from "./Shape";



export default class Rect extends Shape {

    public isFill      = true;
    public isSelection = false;

    public normalPointsShape(): void {
        if(this.points.length != 2) return;
        
        if((this.points[0].x > this.points[1].x) && (this.points[0].y < this.points[1].y)){
            const x = this.points[1].x;
            this.points[1].x = this.points[0].x;
            this.points[0].x = x;
        } else if ((this.points[0].y > this.points[1].y) && (this.points[0].x < this.points[1].x)) {
            const y = this.points[1].y;
            this.points[1].y = this.points[0].y;
            this.points[0].y = y;
        } else if(((this.points[0].y > this.points[1].y) && (this.points[0].x > this.points[1].x))) {

            const point: any = {};

            for (const key in this.points[1]) {
                console.log(key);
                point[key] = this.points[1][key as keyof Point];
            }

            point['move'] = this.points[1].move;

            this.points[1] = this.points[0];
            this.points[0] = point;
        }
    }

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
        });
    }

    public scale(scaleCoef: number) {
        this.scaleCoef = scaleCoef;
    }

    public intersectionPoint(point: Point): boolean {

        const left : boolean = point.x >= this.points[0].x && point.y >= this.points[0].y;
        const right: boolean = point.x <= this.points[1].x && point.y <= this.points[1].y; 
        
        return left && right;
    } 


    // ! it's can be if rect parrallels with Axios
    public intersectionRect(rect: Rect): boolean {

        rect.normalPointsShape();

        const a1: Point = this.points[0].x < this.points[1].x ? this.points[0] : this.points[1];
        const a2: Point = this.points[0].x > this.points[1].x ? this.points[0] : this.points[1];

        return !(
            a1.y > rect.points[1].y 
            || a2.y < rect.points[0].y
            || a2.x < rect.points[0].x
            || a1.x > rect.points[1].x
        );
    }


    public intersectionPointWithBorder(point: Point): { inter: boolean, status: 'top' | 'bottom' | 'left' | 'right' | 'none' } {
        
        const delta = 15;

        const bigRect  : Rect = new Rect();
        const smallRect: Rect = new Rect();

        bigRect.setFirstPoint(new Point(this.points[0].x - delta, this.points[0].y - delta));
        bigRect.setSecondPoint(new Point(this.points[1].x + delta, this.points[1].y + delta));

        smallRect.setFirstPoint(new Point(this.points[0].x + delta, this.points[0].y + delta));
        smallRect.setSecondPoint(new Point(this.points[1].x - delta, this.points[1].y - delta));

        const bigHas = bigRect.intersectionPoint(point);
        
        let status: 'top' | 'bottom' | 'left' | 'right' | 'none' = 'none';

        if(point.x <= smallRect.points[0].x && point.y >= smallRect.points[0].y && point.y <= smallRect.points[1].y) {
            status = 'left';
        } else if (point.x >= smallRect.points[1].x && point.y >= smallRect.points[0].y && point.y <= smallRect.points[1].y) {
            status = 'right';
        } else if(point.y <= smallRect.points[0].y && point.x >= smallRect.points[0].x && point.x <= smallRect.points[1].x) {
            status = 'top';
        } else if(point.y >= smallRect.points[1].y && point.x >= smallRect.points[0].x && point.x <= smallRect.points[1].x) {
            status = 'bottom';
        } else if (smallRect.intersectionPoint(point)) {
            status = 'none';
        }

        let inter = false;
        
        if(bigHas == true && status != 'none') {
            inter = true;
        }

        return {
            inter : inter,
            status: inter ? status : 'none',
        }
    }

}
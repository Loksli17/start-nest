import { Point, SystemPoint }                from "../Point";
import { drawSystemBorderLine, isDedicated } from "../utils/decorators";
import Shape                                 from "./Shape";



export class Line extends Shape {

    public lineWidth = 2;

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
    @drawSystemBorderLine()
    public render(ctx: CanvasRenderingContext2D): { systemPoints: Array<SystemPoint>, ctx: any } {

        if(ctx == undefined){
            throw new Error("CTX is null. Why?");
        }

        const normalPoints = this.normalPoints(this.points);

        ctx.lineWidth   = this.lineWidth; //! BAAAD
        ctx.strokeStyle = this.color;
        
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
        console.log('normal');
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
        
        if(Math.abs(this.points[0].x - this.points[1].x) > 10) {
            const line1 = new Line();
            line1.setFirstPoint(new Point(this.points[0].x, this.points[0].y - 20));
            line1.setSecondPoint(new Point(this.points[1].x, this.points[1].y - 20));

            const line2 = new Line();
            line2.setFirstPoint(new Point(this.points[0].x, this.points[0].y + 20));
            line2.setSecondPoint(new Point(this.points[1].x, this.points[1].y + 20));

            let first  = false;
            let second = false;

            let xRes = false;

            if(this.points[0].x < this.points[1].x) {
                first  = ((point.x - line1.points[0].x) * (line1.points[1].y - line1.points[0].y) - (line1.points[1].x - line1.points[0].x) * (point.y - line1.points[0].y)) < 0;
                second = ((point.x - line2.points[0].x) * (line2.points[1].y - line2.points[0].y) - (line2.points[1].x - line2.points[0].x) * (point.y - line2.points[0].y)) > 0;
                xRes = point.x >= this.points[0].x && point.x <= this.points[1].x;
            } else {
                first  = ((point.x - line1.points[0].x) * (line1.points[1].y - line1.points[0].y) - (line1.points[1].x - line1.points[0].x) * (point.y - line1.points[0].y)) > 0;
                second = ((point.x - line2.points[0].x) * (line2.points[1].y - line2.points[0].y) - (line2.points[1].x - line2.points[0].x) * (point.y - line2.points[0].y)) < 0;
                xRes = point.x <= this.points[0].x && point.x >= this.points[1].x;
            }

            return first && second && xRes;

        } else {
            //* if line is |

            const line1 = new Line();
            line1.setFirstPoint(new Point(this.points[0].x - 15, this.points[0].y));
            line1.setSecondPoint(new Point(this.points[1].x - 15, this.points[1].y ));

            const line2 = new Line();
            line2.setFirstPoint(new Point(this.points[0].x + 15, this.points[0].y ));
            line2.setSecondPoint(new Point(this.points[1].x + 15, this.points[1].y));

            let first  = false;
            let second = false;

            let yRes = false;
            
            if(this.points[0].y < this.points[1].y) {
                first  = ((point.x - line1.points[0].x) * (line1.points[1].y - line1.points[0].y) - (line1.points[1].x - line1.points[0].x) * (point.y - line1.points[0].y)) > 0;
                second = ((point.x - line2.points[0].x) * (line2.points[1].y - line2.points[0].y) - (line2.points[1].x - line2.points[0].x) * (point.y - line2.points[0].y)) < 0;
                yRes = point.y >= this.points[0].y && point.y <= this.points[1].y;
            } else {
                first  = ((point.x - line1.points[0].x) * (line1.points[1].y - line1.points[0].y) - (line1.points[1].x - line1.points[0].x) * (point.y - line1.points[0].y)) < 0;
                second = ((point.x - line2.points[0].x) * (line2.points[1].y - line2.points[0].y) - (line2.points[1].x - line2.points[0].x) * (point.y - line2.points[0].y)) > 0;
                yRes = point.y <= this.points[0].y && point.y >= this.points[1].y;
            }

            console.log(first, second, yRes);

            return first && second && yRes;
        }
        
    }


    public intersectionPointWithBorder(point: Point): { inter: boolean; status: "first" | "second" | "none"; } {
        
        let inter = false;
        let status: "first" | "second" | "none" = 'none';

        if(Math.pow(point.x - this.points[0].x, 2) + Math.pow(point.y - this.points[0].y, 2) <= 10 * 10) {
            inter = true;
            status = "first";
        }

        if(Math.pow(point.x - this.points[1].x, 2) + Math.pow(point.y - this.points[1].y, 2) <= 10 * 10) {
            inter = true;
            status = "second";
        }

        return { 
            inter: inter, 
            status: status,
        };
    }
}
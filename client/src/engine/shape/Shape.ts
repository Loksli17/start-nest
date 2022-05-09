import { Point } from "../Point";


export default abstract class Shape {

    public isDedicated = false;
    public scaleCoef   = 1;

    protected points: Array<Point> = [];

    protected normalCoord(coord: number): number{
        return coord * this.scaleCoef;
    }

    protected normalPoints(points: Array<Point>): Array<Point> {
        
        const normalPoints: Array<Point> = [];

        points.forEach((point: Point) => {
            const normalPoint = point;
            normalPoint.x = this.normalCoord(point.x);
            normalPoint.y = this.normalCoord(point.y);
            normalPoints.push(point);
        });

        return normalPoints;
    }

    public abstract render(ctx: any): void;
    public abstract move(x: number, y: number): void;
    public abstract scale(scaleCoef: number): void;
    public abstract intersectionRect(shape: Shape): boolean;
    public abstract intersectionPoint(point: Point): boolean;
}
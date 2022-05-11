import methodDecoratorFactory from "@/utils/methodDecoratorFactory";
import { Point, SystemPoint }        from "../Point";
import { Line } from "../shape/Line";


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
            
            data.ctx.strokeStyle = "#0e0efe"; //! add CONSTS 

            data.ctx.strokeRect(
                data.systemPoints[0].x, 
                data.systemPoints[0].y,
                data.systemPoints[1].x - data.systemPoints[0].x,
                data.systemPoints[1].y - data.systemPoints[0].y,
            );

            return data;
        });
    },

    //? maybe i need in full shape here
    drawSystemBorderLine = () => {
        return methodDecoratorFactory.createDecoratorAfter((data: {systemPoints: Array<SystemPoint>, ctx: CanvasRenderingContext2D}) => {
            
            if(data.systemPoints.length == 0) return data;
        
            const line1: Line = new Line();
            
            line1.setFirstPoint(new Point(data.systemPoints[0].x, data.systemPoints[0].y));
            line1.setSecondPoint(new Point(data.systemPoints[1].x, data.systemPoints[1].y));
            line1.color = "#0e0efe";
            line1.lineWidth = 1;
            line1.render(data.ctx);
            
            return data;
        });
    };


export {
    isDedicated,
    drawSystemBorderRect,
    drawSystemBorderLine,
}
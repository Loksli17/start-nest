import methodDecoratorFactory from "@/utils/methodDecoratorFactory";
import { SystemPoint }        from "../Point";


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
    };


export {
    isDedicated,
    drawSystemBorderRect,
}
import { Injectable } from "@nestjs/common";
import * as cluster   from "cluster";
import * as os        from 'os';

const numCPUs: number = os.cpus().length;


@Injectable()
export default class AppClusterService {

    public static clisterize(boostrap: () => void): void {
        
        if((cluster as any).isPrimary){
            console.log(`Master server starter on ${process.pid}`);

            for(let i = 0; i < numCPUs; i++){
                (cluster as any).fork();
            }

            (cluster as any).on('exit', (worker, code: number, signal: string) => {
                console.log(`Worker ${worker.process.pid} died. Restarting.`)
            });
        } else {
            console.log(`cluster server started on ${process.pid}`);
            boostrap();
        }
    }
}
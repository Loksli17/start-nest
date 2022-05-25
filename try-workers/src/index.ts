import { Worker } from "worker_threads";
//@ts-ignore
import readline from 'readline-promise';


interface workerData {
    id: number;
}


const workerFactory = (data: workerData): Worker => {

    const worker: Worker = new Worker("./dist/worker.js");

    worker.on("message", (value: any) => {
        // console.log(`[message]: ${value}`);
    });

    worker.on("error", (err: Error) => {
        console.error(err);
    });

    return worker;
}


const workers: Array<Worker> = [];


const main = async () => {

    const readPromise = readline.createInterface({
        input   : process.stdin,
        output  : process.stdout,
        terminal: true
    });

    while(true) {

        const answer: string = await readPromise.questionAsync("1 - create new worker \n2 - show exists \n3 - system data");

        switch(answer) {

            case "1":
                const worker: Worker = workerFactory({id: workers.length + 1});
                workers.push(worker);
                break;

            case "2":
                workers.forEach((worker: Worker) => console.log(`[ worker: ${worker.threadId} ]`));
                break;

            case "3":
                console.log(process.memoryUsage());

            default:
                break; 
        }
    }
};


main();
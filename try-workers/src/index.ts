import { Worker } from "worker_threads";


const main = () => {
    
    const worker: Worker = new Worker("./dist/worker.js");

    worker.on("message", (value: any) => {
        console.log(`[message]: ${value}`);
    });

    worker.on("error", (err: Error) => {
        console.error(err);
    });
};

main();
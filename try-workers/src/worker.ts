import { parentPort, workerData } from "worker_threads";


const interval: NodeJS.Timer = setInterval(() => {
    parentPort?.postMessage('I am worker!!! Kiss me!!');
}, 1000);


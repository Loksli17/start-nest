"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
//@ts-ignore
const readline_promise_1 = __importDefault(require("readline-promise"));
const workerFactory = () => {
    const worker = new worker_threads_1.Worker("./dist/worker.js");
    worker.on("message", (value) => {
        console.log(`[message]: ${value}`);
    });
    worker.on("error", (err) => {
        console.error(err);
    });
    return worker;
};
const workers = [];
const main = async () => {
    const readPromise = readline_promise_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });
    while (true) {
        const value = await readPromise.questionAsync('Foo?');
        console.log(value);
        // readLine.question("1 - create new worker, 2 - show exists", (answer: string) => {
        //     console.log(answer);
        //     switch(answer) {
        //         case "1":
        //             const worker: Worker = workerFactory();
        //             workers.push(worker);
        //             break;
        //         case "2":
        //             console.log(workers);
        //             break;
        //         default:
        //             break; 
        //     }
        // });
    }
};
main();

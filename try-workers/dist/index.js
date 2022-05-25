"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
//@ts-ignore
const readline_promise_1 = __importDefault(require("readline-promise"));
const workerFactory = (data) => {
    const worker = new worker_threads_1.Worker("./dist/worker.js");
    worker.on("message", (value) => {
        // console.log(`[message]: ${value}`);
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
        const answer = await readPromise.questionAsync("1 - create new worker \n2 - show exists \n3 - system data");
        switch (answer) {
            case "1":
                const worker = workerFactory({ id: workers.length + 1 });
                workers.push(worker);
                break;
            case "2":
                workers.forEach((worker) => console.log(`[ worker: ${worker.threadId} ]`));
                break;
            case "3":
                console.log(process.memoryUsage());
            default:
                break;
        }
    }
};
main();

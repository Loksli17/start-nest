"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const main = () => {
    const worker = new worker_threads_1.Worker("./dist/worker.js");
    worker.on("message", (value) => {
        console.log(`[message]: ${value}`);
    });
    worker.on("error", (err) => {
        console.error(err);
    });
    // const interval: number = setInterval(() => {
    // }, 1000);
};
main();

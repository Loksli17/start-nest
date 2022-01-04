import { Injectable } from "@nestjs/common";
import Task           from "src/models/Task";


@Injectable()
export class TaskService {

    async getAll(): Promise<Array<Task>> {
        return await Task.findAll(); 
    }
}
import { Injectable } from "@nestjs/common";
import Task           from "src/models/Task";


@Injectable()
export class TaskService {

    async getAll(): Promise<Array<Task>> {
        return await Task.findAll({
            order: [['id', 'DESC']], 
        }); 
    }

    async addOne(task: Task): Promise<void> {
        await task.save();
    }

    async removeOne(id: number): Promise<void> {
        await Task.destroy({where: {id: id}});
    }
}
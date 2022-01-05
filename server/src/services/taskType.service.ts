import { Injectable } from "@nestjs/common";
import TaskType       from "src/models/TaskType";


@Injectable()
export class TaskTypeService {

    async getAll(): Promise<Array<TaskType>> {
        return await TaskType.findAll(); 
    }

    async addOne(taskType: TaskType): Promise<void> {
        await taskType.save();
    }

    async removeOne(id: number): Promise<void> {
        await TaskType.destroy({where: {id: id}});
    }
}
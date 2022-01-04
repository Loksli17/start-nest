import { Controller, Get } from "@nestjs/common";
import Task                from "src/models/Task";
import { TaskService }     from "src/services/task.service";


@Controller('task')
export class TaskController {

    private readonly taskService: TaskService = new TaskService();

    @Get('get-all')
    public async getAll(): Promise<Array<Task>> {
        return await this.taskService.getAll()
    }
}
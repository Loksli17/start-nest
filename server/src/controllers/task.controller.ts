import { Controller, Get } from "@nestjs/common";
import Task                from "src/models/Task";
import { TaskService }     from "src/services/task.service";


@Controller('task')
export class TaskController {

    private readonly taskService: TaskService = new TaskService();

    @Get('get-all')
    public async getAll(): Promise<{tasks: Array<Task>}> {
        let tasks: Array<Task> = [];
        tasks = await this.taskService.getAll();
        return {tasks: tasks};
    }
}
import { Controller, Delete, Get, Param, Put } from "@nestjs/common";
import Task                from "src/models/Task";
import { TaskService }     from "src/services/task.service";


@Controller('task')
export class TaskController {

    private readonly taskService: TaskService = new TaskService();

    @Get('get-all')
    public async getAll(): Promise<{tasks: Array<Task>}> {
        let tasks: Array<Task> = [];
        tasks = await this.taskService.getAll();
        return { tasks: tasks };
    }


    @Put('add')
    public async addOne(): Promise<{msg: string}> {

        const task: Task = Task.build({
            text      : 'text',
            taskTypeId: 1,
            date      : new Date(),
            time      : '22:00:00',
        });

        await this.taskService.addOne(task);

        return {msg: 'Created successfully'}
    }

    
    @Delete('remove/:id')
    public async removeOne(@Param() params): Promise<{msg: string}> {
        const id: number = params.id;
        await this.taskService.removeOne(id);
        return {msg: 'Removed successfully'};
    }
}
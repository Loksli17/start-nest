import { Controller, Delete, Get, Param, Put, Request } from "@nestjs/common";
import Task                                             from "src/models/Task";
import { TaskService }                                  from "src/services/task.service";
import * as moment                                      from 'moment';


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
    public async addOne(@Request() req): Promise<{msg: string}> {

        const task: Task = Task.build({
            text      : req.body.task.text,
            taskTypeId: req.body.task.taskTypeId,
            date      : new Date(),
            time      : moment().format('hh:mm:ss'),
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
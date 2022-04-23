import { Controller, Delete, Get, Param, Put, Query, Request } from "@nestjs/common";
import Task                                                    from "src/models/Task";
import { TaskService }                                         from "src/services/task.service";



@Controller('task')
export class TaskController {

    private readonly taskService: TaskService = new TaskService();


    @Get('get-all')
    public async getAll(@Query() query): Promise<{tasks: Array<Task>}> {

        const queryData: string = query.filter;

        let tasks: Array<Task> = [];
        tasks = await this.taskService.getAll(queryData);
        return { tasks: tasks };
    }


    @Put('add')
    public async addOne(@Request() req): Promise<{msg: string}> {
        await this.taskService.saveOne({text: req.body.task.text, taskTypeId: req.body.task.taskTypeId});
        return { msg: 'Created successfully' }
    }

    
    @Delete('remove/:id')
    public async removeOne(@Param() params): Promise<{msg: string}> {
        const id: number = params.id;
        await this.taskService.removeOne(id);
        return  {msg: 'Removed successfully' };
    }


    @Put('edit/:id')
    public async editOne(@Request() req, @Param() params): Promise<{msg: string, task: Task}> {
        const id: number = params.id;
        const task: Task = await this.taskService.updateOne({text: req.body.task.text, taskTypeId: req.body.task.taskTypeId}, id);
        return { msg: 'Updated successfully', task: task };
    }
}
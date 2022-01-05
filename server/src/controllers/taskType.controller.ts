import { Controller, Get}  from "@nestjs/common";
import TaskType            from "src/models/TaskType";
import { TaskTypeService } from "src/services/taskType.service";


@Controller('task-type')
export class TaskTypeController {

    private readonly taskTypeService: TaskTypeService = new TaskTypeService();

    @Get('get-all')
    public async getAll(): Promise<{types: Array<TaskType>}> {
        let types: Array<TaskType> = [];
        types = await this.taskTypeService.getAll();
        return { types: types };
    }
}
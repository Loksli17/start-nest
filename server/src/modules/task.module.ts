import { Module } from "@nestjs/common";
import { TaskController } from "src/controllers/task.controller";
import { TaskTypeController } from "src/controllers/taskType.controller";
import { TaskService } from "src/services/task.service";
import { TaskTypeService } from "src/services/taskType.service";


@Module({
    
    controllers: [
        TaskController,
        TaskTypeController,
    ],

    providers: [
        TaskTypeService,
        TaskService,
    ]
})

export class TaskModule { }
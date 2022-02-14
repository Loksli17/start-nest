import { Module }             from '@nestjs/common';
import { AppController }      from './app.controller';
import { AppService }         from './app.service';
import { TaskController }     from './controllers/task.controller';
import database               from './config/database';
import { TaskService }        from './services/task.service';
import { TaskTypeController } from './controllers/taskType.controller';
import { TaskTypeService }    from './services/taskType.service';


@Module({
    imports    : [database],
    controllers: [AppController, TaskController, TaskTypeController],
    providers  : [AppService, TaskService, TaskTypeService],
})

export class AppModule {}

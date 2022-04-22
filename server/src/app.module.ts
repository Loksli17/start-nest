import { Module }             from '@nestjs/common';
import { AppController }      from './app.controller';
import { AppService }         from './app.service';
import { TaskController }     from './controllers/task.controller';
import database               from './config/database';
import { TaskService }        from './services/task.service';
import { TaskTypeController } from './controllers/taskType.controller';
import { TaskTypeService }    from './services/taskType.service';
import { ArticleContoroller } from './controllers/article.controller';
import { TagController }      from './controllers/tag.controller';
import TagService             from './services/tag.service';


@Module({
    
    imports: [database],

    controllers: [
        AppController, 
        TaskController, 
        TaskTypeController, 
        ArticleContoroller, 
        TagController
    ],

    providers  : [
        AppService, 
        TaskService, 
        TaskTypeService,
        TagService
    ],
})

export class AppModule {}

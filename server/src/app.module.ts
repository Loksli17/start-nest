import { Module }            from '@nestjs/common';
import database              from './config/database';
import { TaskModule }        from './modules/task.module';
import { ArticleModule }     from './modules/article.module';
import { ChatModule }        from './modules/chat.module';
import { AuthModule }        from './modules/auth.module';
import { ProjectModule }     from './modules/project.module';


@Module({
    imports: [
        database,
        TaskModule,
        ArticleModule,
        AuthModule,
        ChatModule,
        ProjectModule,
    ],
})
export class AppModule {}

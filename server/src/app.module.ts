import { Module }            from '@nestjs/common';
import database              from './config/database';
import { TaskModule }        from './modules/task.module';
import { ArticleModule }     from './modules/article.module';
import { ChatModule }        from './modules/chat.module';
import { AuthModule }        from './modules/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join }              from 'path';


@Module({
    imports: [
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'public'),
        // }),
        database,
        TaskModule,
        ArticleModule,
        AuthModule,
        ChatModule,
    ],
})

export class AppModule {}

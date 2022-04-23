import { Module }        from '@nestjs/common';
import database          from './config/database';
import AuthController    from './controllers/auth.controller';
import { UserService }   from './services/user.service';
import { TaskModule }    from './modules/task.module';
import { ArticleModule } from './modules/article.module';


@Module({
    imports: [
        database,
        TaskModule,
        ArticleModule,
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        UserService
    ],
})

export class AppModule {}

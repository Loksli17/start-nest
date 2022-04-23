import { Module }        from '@nestjs/common';
import database          from './config/database';
import AuthController    from './controllers/auth.controller';
import { UserService }   from './services/user.service';
import { TaskModule }    from './modules/task.module';
import { ArticleModule } from './modules/article.module';
import { AuthModule } from './modules/auth.module';


@Module({
    imports: [
        database,
        TaskModule,
        ArticleModule,
        AuthModule
    ],

    controllers: [
    ],

    providers: [
        UserService
    ],
})

export class AppModule {}

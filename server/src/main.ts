import { NestFactory } from '@nestjs/core';
import { AppModule }   from './app.module';
import config          from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin        : config.cors.origin,
        methods       : config.cors.methods,
        credentials   : true,
        exposedHeaders: ['set-cookie'],
    });
    
    await app.listen(config.app.port);
}

bootstrap();

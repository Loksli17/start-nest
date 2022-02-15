import { NestFactory }                            from '@nestjs/core';
import { AppModule }                              from './app.module';
import config                                     from './config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'


async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableCors({
        origin        : config.cors.origin,
        methods       : config.cors.methods,
        credentials   : true,
        exposedHeaders: ['set-cookie'],
    });
    
    await app.listen(config.app.port);
}

bootstrap();

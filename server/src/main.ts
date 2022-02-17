import { NestFactory }                            from '@nestjs/core';
import { AppModule }                              from './app.module';
import config                                     from './config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AppClusterService                          from './cluster.service';


const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableCors({
        origin        : config.cors.origin,
        methods       : config.cors.methods,
        credentials   : true,
        exposedHeaders: ['set-cookie'],
    });
    
    await app.listen(config.app.port, '192.168.1.35');
}


AppClusterService.clisterize(bootstrap);
// bootstrap();

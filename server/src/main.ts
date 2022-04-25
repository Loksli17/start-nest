import { NestFactory }                            from '@nestjs/core';
import { AppModule }                              from './app.module';
import config                                     from './config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AppClusterService                          from './services/cluster.service';
import fastifyCookie                              from 'fastify-cookie';


const bootstrap = async (): Promise<void> => {
    
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    await app.register(
        fastifyCookie, 
        {
            secret: 'opa', 
        }
    );

    app.enableCors({
        origin        : config.cors.origin,
        methods       : config.cors.methods,
        credentials   : true,
        exposedHeaders: ['set-cookie'],
    });
    
    await app.listen(config.app.port);
}


AppClusterService.clisterize(bootstrap);
// bootstrap();

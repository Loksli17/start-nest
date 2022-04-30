import { NestFactory }                            from '@nestjs/core';
import { AppModule }                              from './app.module';
import config                                     from './config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AppClusterService                          from './services/cluster.service';
import fastifyCookie                              from 'fastify-cookie';
import fastifyMultipart                           from 'fastify-multipart';
import { join }                                   from 'path';
import { SocketAdapter }                          from './adapters/socket.adapter';


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

    app.useWebSocketAdapter(new SocketAdapter(app));

    app.register(fastifyMultipart, {preservePath: true});

    app.enableCors({
        origin        : config.cors.origin,
        methods       : config.cors.methods,
        credentials   : true,
        exposedHeaders: ['set-cookie'],
    });

    app.useStaticAssets({
        root: join(__dirname, '..', "public"),
        wildcard: true,
    });
    
    await app.listen(config.app.port);
}


AppClusterService.clisterize(bootstrap);
// bootstrap();

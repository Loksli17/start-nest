import { IoAdapter } from "@nestjs/platform-socket.io";
import config from "src/config";


export class SocketAdapter extends IoAdapter {

    createIOServer(port: number, options?: any) {
        
        const server = super.createIOServer(port, {
             ...options,
            cors: {
                origin     : config.cors.origin,
                methods    : config.cors.methods,
                credentials: true,
            }
        });
        
        return server;
    }
}
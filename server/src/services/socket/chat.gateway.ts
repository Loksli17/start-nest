import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";


@WebSocketGateway({crossOriginIsolated: true})
export class ChatGateway {

    @WebSocketServer()
    private server;

    @SubscribeMessage('addToRoom')
    public async addToRoomNotification(client, data): Promise<void> {
        console.log(client);
        this.server.emit('addToRoom', data);
    }
}
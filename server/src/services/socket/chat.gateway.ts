import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import Message from "src/models/Message";


@WebSocketGateway({crossOriginIsolated: true})
export class ChatGateway {

    @WebSocketServer()
    private server;

    @SubscribeMessage('addToRoom')
    public async addToRoomNotification(client, data): Promise<void> {
        console.log(client);
        this.server.emit('addToRoom', data);
    }


    @SubscribeMessage('message')
    public async sendMessage(client, data: {content: string, roomId: string, userId: number}): Promise<void> {
        
        let message: Message = Message.build(data);

        message.set('date', '2022-04-30'); //! i need in moment
        message.set('time', '22:20');

        try {
            await message.save()
        } catch (error) {
            console.error(error);    
        }

        this.server.emit('message', data);
    }
}
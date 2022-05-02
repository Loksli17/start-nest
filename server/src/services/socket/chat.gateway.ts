import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import * as moment        from 'moment'
import Message            from "src/models/Message";
import { MessageService } from "../chat/message.service";
import { UserService }    from "../user.service";


@WebSocketGateway({crossOriginIsolated: true})
export class ChatGateway {

    constructor(
        private userService   : UserService,
        private messageService: MessageService,
    ){}


    @WebSocketServer()
    private server;


    @SubscribeMessage('addToRoom')
    public async addToRoomNotification(client, data): Promise<void> {
        console.log(client);
        this.server.emit('addToRoom', data);
    }


    @SubscribeMessage('joinInRooms')
    public async joinInRoom(client, data: {roomsIds: Array<number>}){
        
        data.roomsIds.forEach((id: number) => {
            client.join(`room:${id}`);
        });
    }


    //!use message service!!
    @SubscribeMessage('message')
    public async sendMessage(client, data: {content: string, roomId: string, userId: number}): Promise<void> {

        client.join(`room:${data.roomId}`);
        
        const message: Message = await this.messageService.addOneInRoom(data);

        message.setDataValue('user', await this.userService.getOneById(message.get('userId')))
        message.set('date', moment(),)

        this.server.to(`room:${data.roomId}`).emit('message', message);
    }
}
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import Message from "src/models/Message";
import { MessageService } from "../chat/message.service";
import { UserService } from "../user.service";


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

        console.log(client.adapter.rooms);
        
        // this.server.to(`room:${data.roomId}`).emit('joinInRooms', 'Success join to chat!');
    }


    //!use message service!!
    @SubscribeMessage('message')
    public async sendMessage(client, data: {content: string, roomId: string, userId: number}): Promise<void> {

        client.join(`room:${data.roomId}`);
        
        let message: Message = Message.build(data);

        message.set('date', '2022-04-30'); //! i need in moment
        message.set('time', '22:20');

        try {
            await message.save()
        } catch (error) {
            console.error(error);    
        }

        this.server.to(`room:${data.roomId}`).emit('message', data);
    }
}
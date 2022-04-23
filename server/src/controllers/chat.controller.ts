import { Controller, Put } from "@nestjs/common";
import { MessageService }  from "src/services/chat/message.servise";
import { RoomService }     from "src/services/chat/room.service";
import { UserService }     from "src/services/user.service";


@Controller('/chat')
export default class ChatController {

    constructor(
        // private userService   : UserService,
        private roomService   : RoomService,
        private messageService: MessageService,
    ) {}

    @Put('create-room')
    public async createRoom(): Promise<any>{

        return {

        }
    }
}
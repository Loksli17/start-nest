import { Controller, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/services/auth/jwt-auth.guard";

import { MessageService } from "src/services/chat/message.servise";
import { RoomService }    from "src/services/chat/room.service";
import { UserService }    from "src/services/user.service";


@Controller('chat')
export default class ChatController {

    constructor(
        private userService   : UserService,
        private roomService   : RoomService,
        private messageService: MessageService,
    ) {}


    @UseGuards(JwtAuthGuard)
    @Put('create-room')
    public async createRoom(@Request() req): Promise<any> {

        const name: string = req.body.name;

        console.log(name, req.headers);
        
        return {

        }
    }
}
import { Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import Message from "src/models/Message";

import Room               from "src/models/Room";
import { JwtAuthGuard }   from "src/services/auth/jwt-auth.guard";
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
    @Put('create-room/:userId')
    public async createRoom(@Request() req, @Param() params): Promise<{room: Room}> {

        const name: string = req.body.name;

        const room: Room = await this.roomService.createRoom({name, userId: params.userId});
        
        return {
            room: room,
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('get-rooms/:userId')
    public async getRooms(@Param() params): Promise<Array<Room>> {

        const rooms: Array<Room> = await this.roomService.getRooms(params.userId);
        return rooms;
    }


    @Get('get-messages/:roomId')
    public async getRoomMessages(@Param() params): Promise<Array<Message>> {
        return await this.messageService.getAll(params.roomId);
    }
}
import { Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";

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
    @Put('create-room')
    public async createRoom(@Request() req): Promise<{room: Room}> {

        const name: string = req.body.name;

        const room: Room = await this.roomService.createRoom({name});
        
        return {
            room: room,
        }
    }


    // @UseGuards(JwtAuthGuard)
    @Get('get-rooms/:userId')
    public async getAll(@Param() params): Promise<Array<Room>> {

        const rooms: Array<Room> = await this.roomService.getRooms(params.userId);
        return rooms;
    }
}
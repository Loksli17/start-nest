import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import Message from "src/models/Message";

import Room               from "src/models/Room";
import User               from "src/models/User";
import { JwtAuthGuard }   from "src/services/auth/jwt-auth.guard";
import { MessageService } from "src/services/chat/message.service";
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


    @UseGuards(JwtAuthGuard)
    @Get('get-messages/:roomId')
    public async getRoomMessages(@Param() params): Promise<Array<Message>> {
        return await this.messageService.getAll(params.roomId);
    }


    @UseGuards(JwtAuthGuard)
    @Post('search-user')
    public async searchUser(@Body() body): Promise<Array<User>> {
        return this.userService.getOneBySearchLogin(body.searchLogin, body.userIds);
    }


    @UseGuards(JwtAuthGuard)
    @Put('add-user-in-room')
    public async addUserInRoom(@Body() body): Promise<{id: number, login: string}>{
        return this.roomService.addUserInRoom(body.user, body.roomId); 
    }


    @UseGuards(JwtAuthGuard)
    @Post('remove-user-from-room')
    public async removeUserFromRoom(@Body() body): Promise<{id: number, login: string}>{
        return this.roomService.removeUserFromRoom(body.user, body.roomId); 
    }


    @UseGuards(JwtAuthGuard)
    @Put('edit-room-name')
    public async editRoomName(@Body() body): Promise<Room> {
        console.log(body);
        return this.roomService.editRoomName(body.name, body.id); 
    }
 
}
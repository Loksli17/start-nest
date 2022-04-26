import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Room from "src/models/Room";
import RoomHasUser from "src/models/RoomHasUser";
import User from "src/models/User";

@Injectable()
export class RoomService {
    

    public async createRoom(roomDto: {name: string}): Promise<Room> {

        const room: Room = Room.build(roomDto);

        try {
            await room.save();
        } catch (error) {
            throw new HttpException('Error with saving room', HttpStatus.BAD_REQUEST);
        }
        
        const roomHasUser: RoomHasUser = RoomHasUser.build({
            userId: 1,
            roomId: room.id,
        });

        try {
            await roomHasUser.save()
        } catch (error) {
            throw new HttpException('Error with saving room', HttpStatus.BAD_REQUEST);
        }

        return room;
    }


    public async getRooms(userId: number): Promise<Array<Room>> {

        const rooms: Array<Room> = await Room.findAll({
            include: [
                {model: User, as: 'users'}, 
                {model: RoomHasUser, where: {userId: userId}, attributes: []}
            ]
        });

        rooms.map((room: Room) => {
            delete room['roomHasUser'];
        });

        return rooms;
    }
}
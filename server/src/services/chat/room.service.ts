import { Injectable } from "@nestjs/common";
import Room from "src/models/Room";

@Injectable()
export class RoomService {
    

    public async createRoom(roomDto: {name: string}): Promise<Room> {

        const room: Room = Room.build(roomDto);

        await room.save();
        
        return room;
    }
}
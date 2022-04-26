import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Message from "src/models/Message";
import User from "src/models/User";


@Injectable()
export class MessageService {
    

    public async getAll(roomId: number): Promise<Array<Message>> {

        let messages: Array<Message> = [];
        
        try {
            messages = await Message.findAll({
                where: {
                    roomId: roomId,
                }, 
                include: [{model: User, attributes: ['login']}],
                order  : [['id', 'desc']],
            });
        } catch (error) {
            throw new HttpException('Db error', HttpStatus.BAD_REQUEST);
        }

        return messages;
    }
}
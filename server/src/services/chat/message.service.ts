import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import Message     from "src/models/Message";
import User        from "src/models/User";
import * as moment from 'moment'


@Injectable()
export class MessageService {
    

    public async getAll(roomId: number, limit: number): Promise<Array<Message>> {

        let messages: Array<Message> = [];
        
        try {

            const count: number = await Message.count({where: {
                    roomId: roomId,
                }, 
            });

            const skip: number = (count > limit) ? count - limit : 0;

            messages = await Message.findAll({
                where: {
                    roomId: roomId,
                }, 
                include: [{model: User, attributes: ['login']}],
                limit: limit,
                offset: skip
            });
        } catch (error) {
            console.error(error);
            throw new HttpException('Db error', HttpStatus.BAD_REQUEST);
        }

        messages.forEach((message: Message) => {
            message.setDataValue('date', moment(message.get('date')).format("MMMM Do YYYY"));
        });

        return messages;
    }


    public async addOneInRoom(data: {content: string, roomId: string, userId: number}): Promise<Message> {

        let message: Message = Message.build(data);

        message.set('date', moment().format('YYYY-MM-DD'));
        message.set('time', moment().format('HH:mm:ss'));

        try {
            await message.save()
        } catch (error) {
            console.error(error);    
        }

        message.setDataValue('date', moment(message.get('date')).format("MMMM Do YYYY"));
        
        return message;
    }
}
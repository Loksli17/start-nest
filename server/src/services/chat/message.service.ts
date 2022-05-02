import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import Message     from "src/models/Message";
import User        from "src/models/User";
import * as moment from 'moment'


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
            });
        } catch (error) {
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

        try {
            await message.save()
        } catch (error) {
            console.error(error);    
        }

        message.setDataValue('date', moment(message.get('date')).format("MMMM Do YYYY"));
        
        return message;
    }
}
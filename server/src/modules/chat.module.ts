import { Module }         from "@nestjs/common";
import ChatController     from "src/controllers/chat.controller";
import { FileService }    from "src/services/chat/file.service";
import { MessageService } from "src/services/chat/message.service";
import { RoomService }    from "src/services/chat/room.service";
import { ChatGateway }    from "src/services/socket/chat.gateway";
import { UserService }    from "src/services/user.service";
import { AuthModule }     from "./auth.module";



@Module({

    imports: [
        AuthModule,
    ],

    providers: [
        UserService,
        RoomService,
        MessageService,
        FileService,
        ChatGateway,
    ],
    
    controllers: [
        ChatController,
    ],
})
export class ChatModule {}
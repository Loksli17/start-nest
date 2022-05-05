import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ProjectService }   from "../project.service";


@WebSocketGateway({crossOriginIsolated: true})
export class ProjectGateway {

    constructor(
        private projectService: ProjectService
    ) { }


    @WebSocketServer()
    private server;


    @SubscribeMessage('createProject')
    public async createProject(client, data: {userId: number, name: string}): Promise<void> {
        this.projectService.createProject(data.userId, data.name);
        this.server.emit('createProject', data);
    }
}
import { UseGuards } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProjectService }   from "../project.service";


@WebSocketGateway({crossOriginIsolated: true})
export class ProjectGateway {

    constructor(
        private projectService: ProjectService
    ) { }


    @WebSocketServer()
    private server;

    // @UseGuards(JwtAuthGuard)
    @SubscribeMessage('createProject')
    public async createProject(client, data: {userId: number, name: string}): Promise<void> {
        this.server.emit('createProject', await this.projectService.createProject(data.userId, data.name));
    }


    @SubscribeMessage('getProjects')
    public async getProjects(client, data: {userId: number}): Promise<void> {
        this.server.emit('getProjects', {projects: await this.projectService.getProjects(data.userId)});
    }
}
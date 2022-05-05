import { Module } from "@nestjs/common";
import { ProjectService } from "src/services/project.service";
import { ProjectGateway } from "src/services/socket/project.gateway";


@Module({

    providers: [
        ProjectService,
        ProjectGateway
    ],
})
export class ProjectModule {}
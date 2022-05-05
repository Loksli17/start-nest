import { Injectable } from "@nestjs/common";
import Project from "src/models/Project";


@Injectable()
export class ProjectService {


    public async createProject(userId: number, name: string): Promise<Project> {
        console.log(userId, name);

        return new Project();
    }
}
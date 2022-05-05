import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Project from "src/models/Project";
import ProjectHasUser from "src/models/ProjectHasUser";


@Injectable()
export class ProjectService {


    public async getProjects(userId: number): Promise<Array<Project>> {

        let projects: Array<Project> = [];

        try {
            projects = await Project.findAll({
                include: [{model: ProjectHasUser, attributes: [], where: {userId: userId}}],
                order  : [['id', 'DESC']],
            });

        } catch (error) {
            console.error(error);
            throw new HttpException('not userId', HttpStatus.BAD_REQUEST);
        }

        return projects;
    } 


    public async createProject(userId: number, name: string): Promise<Project> {

        if(userId == undefined) throw new HttpException('not userId', HttpStatus.UNAUTHORIZED);

        let project: Project;

        try {
            project = Project.build({
                name    : name, 
                userId  : userId,
                filename: `${name}.json`,
            });

            await project.save();

            const projectHasUser: ProjectHasUser = ProjectHasUser.build({
                userId   : userId,
                projectId: project.id,
            })

            await projectHasUser.save();
        } catch (error) {
            console.error(error);
            throw new HttpException('not userId', HttpStatus.BAD_REQUEST);
        }

        return project;
    }
}
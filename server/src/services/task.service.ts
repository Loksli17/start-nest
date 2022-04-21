import { Injectable } from "@nestjs/common";
import Task           from "src/models/Task";
import TaskType       from "src/models/TaskType";
import * as moment    from 'moment';


@Injectable()
export class TaskService {


    async getAll(queryData: string): Promise<Array<Task>> {

        const condition: {taskTypeId?: string} = {};

        if(queryData != 'all') condition.taskTypeId = queryData; 

        return await Task.findAll({
            where  : condition,
            order  : [['id', 'DESC']], 
            include: [{model: TaskType}]
        }); 
    }


    async saveOne(reqTask: {text: string, taskTypeId: number}): Promise<void> {
        
        const task: Task = Task.build({
            text      : reqTask.text,
            taskTypeId: reqTask.taskTypeId,
            date      : new Date(),
            time      : moment().format('hh:mm:ss'),
        });

        await task.save();
    }


    async updateOne(reqTask: {text: string, taskTypeId: number}, id: number): Promise<Task> {
        
        const task: Task = await Task.findOne({where: {id: id}});
        
        task.set('text',       reqTask.text);
        task.set('taskTypeId', reqTask.taskTypeId);
        task.set('date',       new Date());
        task.set('time',       moment().format('hh:mm:ss'));

        await task.save();

        return task;
    }


    async removeOne(id: number): Promise<void> {
        await Task.destroy({where: {id: id}});
    }
}
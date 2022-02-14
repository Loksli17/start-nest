import { Column, Model, Table, HasMany } from "sequelize-typescript";
import Task                              from "./Task";


@Table({tableName: 'tasktype', timestamps: false})
export default class TaskType extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column
    public name: string;

    @HasMany(() => Task)
    public tasks: Array<TaskType>;
}
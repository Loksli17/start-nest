import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import TaskType                                        from "./TaskType";


@Table({tableName: 'task', timestamps: false})
export default class Task extends Model {

    @Column
    public text: string;

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column
    public date: Date;

    @Column 
    public time: string;

    @ForeignKey(() => TaskType)
    @Column
    public taskTypeId: number;

    @BelongsTo(() => TaskType)
    public type: TaskType;
}
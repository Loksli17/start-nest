import { Column, Model, Table } from "sequelize-typescript";


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

    @Column
    public taskTypeId: number;
}
import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'tasktype', timestamps: false})
export default class Task extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column
    public name: string;
}
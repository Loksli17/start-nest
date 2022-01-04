import { Column, Model, Table } from "sequelize-typescript";

@Table
export default class Task extends Model {

    @Column
    public text: string;

    @Column
    public id?: number;

    @Column
    public date: Date;

    @Column 
    public time: string;

    @Column
    public taskTypeId: number;
}
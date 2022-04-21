import { Column, Model, Table } from "sequelize-typescript";


@Table({tableName: 'article', timestamps: false})
export default class Article extends Model {

    @Column
    public text: string;

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column
    public date: Date;

    @Column 
    public time: string;

    @Column 
    public img: string;

}
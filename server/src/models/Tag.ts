import { Column, Model, Table } from "sequelize-typescript";


@Table({tableName: 'tag', timestamps: false})
export default class Tag extends Model {

    @Column
    public content: string;

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;
}
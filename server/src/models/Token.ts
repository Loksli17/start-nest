import { Column, ForeignKey, Max, Model, Table } from "sequelize-typescript";
import User from "./User";


@Table({tableName: 'token', timestamps: false})
export default class Token extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Max(255)
    @Column
    public token: string;

    @Max(400)
    @Column
    public client: string;

    @ForeignKey(() => User)
    public userId: number;

    @Column
    public expiredIn: number;
}
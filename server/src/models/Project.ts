import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./User";


@Table({timestamps: false, tableName: 'project'})
export default class Project extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id: number;

    @Column(DataType.STRING(100))
    public name: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    public userId: number;

    @BelongsTo(() => User)
    public user: User;

    @Column(DataType.STRING(100))
    public filename: string;
}
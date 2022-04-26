import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Room from "./Room";
import User from "./User";


@Table({tableName: 'message', timestamps: false})
export default class Message extends Model {


    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column(DataType.STRING(500))
    public content: string;

    @ForeignKey(() => User)
    public userId: number;

    @ForeignKey(() => Room)
    public roomId: number;


    @BelongsTo(() => User)
    public user: User;

    @BelongsTo(() => Room)
    public room: Room;
}
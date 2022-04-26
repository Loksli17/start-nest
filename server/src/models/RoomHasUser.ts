import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

import Room from "./Room";
import User from "./User";


@Table({tableName: 'room_has_user', timestamps: false})
export default class RoomHasUser extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @ForeignKey(() => User)
    @Column
    public userId?: number;

    @ForeignKey(() => Room)
    @Column
    public roomId?: number;

    
    @BelongsTo(() => User)
    public users: Array<User>;

    @BelongsTo(() => Room)
    public rooms: Array<Room>;
}
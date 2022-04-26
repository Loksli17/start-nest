import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import Message     from "./Message";
import RoomHasUser from "./RoomHasUser";
import User        from "./User";


@Table({tableName: 'room', timestamps: false})
export default class Room extends Model {


    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column
    public name: string;

    @ForeignKey(() => User)
    public userId: number;

    @BelongsTo(() => User)
    public user: User;


    @BelongsToMany(() => User, {
        through: { model: () => RoomHasUser },
    })
    public users: Array<User>

    @HasMany(() => RoomHasUser)
    public roomHasUser: Array<RoomHasUser>


    @HasMany(() => Message)
    public messages: Array<Message>;
}
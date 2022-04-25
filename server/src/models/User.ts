import { Column, HasMany, Min, Model, Table } from "sequelize-typescript";
import Token from "./Token";


@Table({tableName: 'user', timestamps: false})
export default class User extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Min(5)
    @Column
    public login: string;

    @Min(5)
    @Column
    public password: string;

    @HasMany(() => Token)
    public tokens: Array<Token>;
}
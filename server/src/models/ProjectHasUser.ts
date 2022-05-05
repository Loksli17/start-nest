import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import Project from "./Project";
import User from "./User";


@Table({tableName: 'project_has_user', timestamps: false})
export default class ProjectHasUser extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @ForeignKey(() => User)
    @Column
    public userId?: number;

    @ForeignKey(() => Project)
    @Column
    public projectId?: number;

    
    @BelongsTo(() => Project)
    public projects: Array<Project>;

    @BelongsTo(() => User)
    public users: Array<User>;
}
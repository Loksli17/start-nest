import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import Article from "./Article";
import Tag from "./Tag";


@Table({tableName: 'project_has_user', timestamps: false})
export default class ArticleHasTag extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @ForeignKey(() => Article)
    @Column
    public articleId?: number;

    @ForeignKey(() => Tag)
    @Column
    public tagId?: number;

    
    @BelongsTo(() => Tag)
    public tags: Array<Tag>;

    @BelongsTo(() => Article)
    public articles: Array<Article>;
}
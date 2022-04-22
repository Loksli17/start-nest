import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import ArticleHasTag            from "./ArticleHasTag";
import Tag                      from "./Tag";



@Table({tableName: 'article', timestamps: false})
export default class Article extends Model {

    @Column
    public content: string;

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;

    @Column
    public date: Date;

    @Column 
    public time: string;

    @Column 
    public img: string;

    @BelongsToMany(() => Tag, {
        through: { model: () => ArticleHasTag },
    })
    public tags: Array<Tag>

    @HasMany(() => ArticleHasTag)
    public articleHasTags: Array<ArticleHasTag>
}
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import Article from "./Article";
import ArticleHasTag from "./ArticleHasTag";


@Table({tableName: 'tag', timestamps: false})
export default class Tag extends Model {

    @Column
    public content: string;

    @Column({primaryKey: true, autoIncrement: true})
    public id?: number;


    @BelongsToMany(() => Article, {
        through: { model: () => ArticleHasTag },
    })
    public articles: Array<Article>

    @HasMany(() => ArticleHasTag)
    public articleHasTags: Array<ArticleHasTag>
}
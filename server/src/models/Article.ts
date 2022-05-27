import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import ArticleHasTag            from "./ArticleHasTag";
import Tag                      from "./Tag";


export interface ArticleDto {
    content: string;
    id?    : number;
    date   : Date;
    time   : string;
    img    : string;
    title  : string;
    
    tags?: Array<Tag>;
}



@Table({tableName: 'article', timestamps: false})
export default class Article extends Model implements ArticleDto {

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

    @Column
    public title: string;

    @BelongsToMany(() => Tag, {
        through: { model: () => ArticleHasTag },
    })
    public tags: Array<Tag>

    @HasMany(() => ArticleHasTag)
    public articleHasTags: Array<ArticleHasTag>
}
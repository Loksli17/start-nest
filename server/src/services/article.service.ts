import { Op }        from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Article       from "src/models/Article";
import Tag           from "src/models/Tag";


export default class ArticleService {

    public async getAll(tagIds: Array<number>): Promise<Array<Article>> {

        //! try another way here!!!
        return await Article.findAll({
            include: [Tag],
            where: tagIds.length ? Sequelize.literal(`Article.id in (SELECT a.id FROM article a 
                join todolist.article_has_tag aht on a.id = aht.articleId
                join todolist.tag t on aht.tagId = t.id
                and t.id in (${tagIds.join(',')})
                group by a.id
                having count(t.id) = ${tagIds.length})`) : Sequelize.literal('true'),
        });
    }


    public async getAllSearch(searchData: string): Promise<Array<Article>> {

        return await Article.findAll({
            where: {title: {[Op.like]: `%${searchData}%`}}
        });
    } 
}
import { Sequelize } from "sequelize-typescript";
import Article from "src/models/Article";
import Tag from "src/models/Tag";


export default class ArticleService {

    public async getAll(tagIds: Array<number>): Promise<Array<Article>> {

        console.log(tagIds.length);

        return (tagIds.length) ? 
            await Article.findAll({
                include: [
                    {
                        model: Tag,
                        attributes: ['id', 'content'],
                        where: {
                            id: tagIds,
                        },   
                    }
                ],
                group: 'id',
                having: Sequelize.literal(`count(\`tags\`.\`id\`) = ${tagIds.length}`),
            })
            :
            await Article.findAll({
                include: [
                    {
                        model: Tag,
                        attributes: ['id', 'content'], 
                    }
                ],
            })

    }
}
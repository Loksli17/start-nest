import Article from "src/models/Article";
import Tag from "src/models/Tag";


export default class ArticleService {

    public async getAll(tagIds: Array<number>): Promise<Array<Article>> {

        return await Article.findAll({
            include: [
                {
                    model: Tag,
                    attributes: ['id', 'content'],
                    // where: {id: 1},
                    // where: {id: {in: tagIds}},
                }
            ]
        });
    }
}
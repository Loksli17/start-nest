import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

import { Op }        from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Article, { ArticleDto }       from "src/models/Article";
import ArticleHasTag from "src/models/ArticleHasTag";
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

        if(searchData == '') return [];

        try {
            return await Article.findAll({
                where  : {title: {[Op.like]: `%${searchData}%`}},
                include: [Tag],
                order  : [['id', 'DESC']],
            });
        } catch (error) {
            console.error(error);
            throw new HttpException('db error', HttpStatus.BAD_REQUEST);
        }
        
    }

    
    public async removeOne(id: string): Promise<string> {

        try {
            const article: Article = await Article.findByPk(id);

            if(article == undefined) {
                throw new HttpException('article not found', HttpStatus.NOT_FOUND);
            }

            await ArticleHasTag.destroy({where: {articleId: id}});

            await article.destroy();

            return 'success deleting';

        } catch (error) {
            console.error(error);
            throw new HttpException('db error', HttpStatus.BAD_REQUEST);
        }
    }
    

    public async add(articleDto: ArticleDto): Promise<string> {
        
        let article: Article = Article.build(articleDto);

        article.set("img", "default.png");

        try {
            await article.save();
        } catch (error) {
            console.error(error);
            throw new HttpException('db error', HttpStatus.BAD_REQUEST);
        }

        return "success save";
    }


    public async findOne(id: string): Promise<Article> {

        try {
            return await Article.findByPk(id);
        } catch (error) {
            console.error(error);
            throw new HttpException('db error', HttpStatus.BAD_REQUEST);
        }
    }


    public async edit(articleDto: ArticleDto): Promise<string> {

        let article = await Article.build(articleDto);

        article.set("title", articleDto.title);
        article.set("content", articleDto.content);
        article.set("time", articleDto.time);
        article.set("date", articleDto.date);

        try {
            await article.save();
        } catch (error) {
            console.error(error);
            throw new HttpException('db error', HttpStatus.BAD_REQUEST);
        }

        return "success edit";
    }
}
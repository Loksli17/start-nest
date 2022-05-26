import { Body, Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";

import Article        from "src/models/Article";
import ArticleService from "src/services/article.service";


@Controller('article')
export class ArticleContoroller {

    private readonly articleService: ArticleService = new ArticleService();

    @Get('get-all')
    public async getAll(@Query() query): Promise<Array<Article>> {

        const tagIds: Array<number> = (query.tagIds != "") ? query.tagIds.split(',') : [];
        const articles: Array<Article> = await this.articleService.getAll(tagIds);
        return articles
    }


    @Post('search')
    public async getAllIndex(@Body() body): Promise<{articles: Array<Article>} > {

        return { 
            articles: await this.articleService.getAllSearch(body.searchData)
        }
    }
}
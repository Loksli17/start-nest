import { Body, Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { query } from "express";
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


    @Post('index')
    public async getAllIndex(@Body() body) {

        return this.articleService.getAllSearch(body.searchData);
    }
}
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from "@nestjs/common";

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
    public async search(@Body() body): Promise<{articles: Array<Article>} > {

        return { 
            articles: await this.articleService.getAllSearch(body.searchData)
        }
    }


    @Delete('remove/:id')
    public async remove(@Param('id') id: string): Promise<{msg: string}> {

        console.log(id);

        return {msg: await this.articleService.removeOne(id)};
    }
}
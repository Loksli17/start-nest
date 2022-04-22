import { Body, Controller, Post } from "@nestjs/common";
import Article        from "src/models/Article";


@Controller('article')
export class ArticleContoroller {

    @Post('gat-all')
    public async getAll(@Body() body): Promise<Array<Article>> {

        const articles: Array<Article> = [];

        console.log(body);

        return articles
    }
}
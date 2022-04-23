import { Module }             from "@nestjs/common";
import { ArticleContoroller } from "src/controllers/article.controller";
import { TagController }      from "src/controllers/tag.controller";
import ArticleService         from "src/services/article.service";
import TagService             from "src/services/tag.service";


@Module({
    
    providers: [
        ArticleService,
        TagService,
    ],

    controllers: [
        ArticleContoroller,
        TagController,
    ]
})
export class ArticleModule {}
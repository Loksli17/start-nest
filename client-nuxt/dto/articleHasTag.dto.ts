import ArticleDto from "./article.dto";
import TagDto     from "./tag.dto";


export default interface ArticleHasTagDto {

    id?       : number;
    articleId?: number;
    tagId?    : number;
    tags      : Array<TagDto>;
    articles  : Array<ArticleDto>;
}
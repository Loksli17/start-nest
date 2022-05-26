import ArticleDto       from "./article.dto";
import ArticleHasTagDto from "./articleHasTag.dto";


export default interface TagDto {

    content       : string;
    id?           : number;
    articles      : Array<ArticleDto>
    articleHasTags: Array<ArticleHasTagDto>
}
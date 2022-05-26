import ArticleHasTagDto from "./articleHasTag.dto";
import TagDto           from "./tag.dto";


export default interface ArticleDto {
    
    content       : string;
    id?           : number;
    date          : Date;
    time          : string;
    img           : string;
    tags          : Array<TagDto>;
    articleHasTags: Array<ArticleHasTagDto>
}
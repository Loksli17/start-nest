import { Axios, AxiosResponse } from "axios";
import ArticleDto               from "~~/dto/article.dto";


export default class ArticleFetch {

    private response: AxiosResponse;
    private axios   : Axios;

    constructor(){
        this.axios = useNuxtApp().$axios;
    }
    
    public async search(data: string): Promise<ArticleFetch> {
        
        this.response = await this.axios.post("http://127.0.0.1:3000/article/search", {
            searchData: data,
        });

        return this;
    }


    public async delete(id: number): Promise<ArticleFetch> {

        this.response = await this.axios.delete(`http://127.0.0.1:3000/article/remove/${id}`);

        return this;
    }


    public getResponse(): AxiosResponse {

        if(this.response == undefined) throw new Error("Response is undefined!!");

        return this.response;
    }


    public normalAll(): ArticleFetch {
        
        this.response.data.articles.map((article: ArticleDto) => {
            // article.time = moment(article.time).format('hh:mm:ss');
            // article.dateView = moment(article.date).format('LL');
            return article;
        });

        return this;
    }

    public getData(): Record<string, any> {

        if(this.response == undefined) throw new Error("Response is undefined!!");

        return this.response.data;
    }
}
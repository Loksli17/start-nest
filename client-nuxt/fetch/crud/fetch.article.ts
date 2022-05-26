import axios, { AxiosResponse } from "axios";
import ArticleDto               from "~~/dto/article.dto";


export default class ArticleFetch {

    private response: AxiosResponse; 

    
    public async search(data: string): Promise<ArticleFetch> {
        const { $axios } = useNuxtApp();
        
        this.response = await $axios.post("http://127.0.0.1:3000/article/search", {
            searchData: data,
        });

        return this;
    }


    public getResponse(): AxiosResponse {

        if(this.response == undefined) throw new Error("Response is undefined!!");

        return this.response;
    }


    public getArticles(): Array<ArticleDto> {

        if(this.response == undefined) throw new Error("Response is undefined!!");

        return this.response.data.articles;
    }
}
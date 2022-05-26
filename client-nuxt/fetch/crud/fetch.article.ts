import axios, { AxiosResponse } from "axios";

export default class ArticleFetch {

    public async searchArticle(data: string): Promise<AxiosResponse> {

        const response: AxiosResponse = await axios.post("http://127.0.0.1:3000/article/search", {
            searchData: data,
        });

        return response;
    }
}
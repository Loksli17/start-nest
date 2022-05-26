
<script setup lang="ts">

    import SearchForm        from "~~/components/crud/SearchForm.vue";
    import ArticleFetch      from "~~/fetch/crud/fetch.article";
    import ArticleDto        from "~~/dto/article.dto";
    import ArticleWrapper    from "../../components/crud/ArticleWrapper.vue";
    import { AxiosResponse } from "axios";

    const articleFetch: ArticleFetch = new ArticleFetch(); 

    let articles = ref<Array<ArticleDto>>([]);

    const sendSearchData = async (data: string) => {
        articles.value = (await articleFetch.search(data)).normalAll().getData().articles;
    };


    const deleteHandler = async (id: number) => {
        
        const response: AxiosResponse = (await articleFetch.delete(id)).getResponse();

        if(response.status == 200) {

            articles.value = articles.value.filter((article: ArticleDto) => article.id != id);
        } else {

        }
    };

</script>


<template>

    <div class=" p-8 grid gap-7">
        <h1 class=" text-4xl font-bold border-gray-500 ">Articles</h1>

        <div class=" mt-5 grid grid-cols-[max-content_max-content] gap-10">
            <SearchForm :handler="sendSearchData"></SearchForm>
            <nuxt-link class="bg-blue-400 h-max py-3 px-5 text-xl rounded-md text-white transition-all hover:bg-blue-500" to="/crud/add">Add</nuxt-link>
        </div>

        <div class="mt-5">
            <ArticleWrapper :data="articles" :deleteHandler="deleteHandler"></ArticleWrapper>
        </div>
    </div>
</template>
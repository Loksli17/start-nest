
<script setup lang="ts">
    import SearchForm     from "~~/components/crud/SearchForm.vue";
    import ArticleFetch   from "~~/composables/crud/fetch.article";
    import ArticleDto     from "~~/dto/article.dto";
    import ArticleWrapper from "../../components/crud/ArticleWrapper.vue";

    const articleFetch: ArticleFetch = new ArticleFetch(); 

    // let articles: Array<ArticleDto> = [];
    let articles = ref<Array<ArticleDto>>([]);

    const sendSearchData = async (data: string) => {
        articles.value = (await articleFetch.searchArticle(data)).data.articles;
    };

</script>


<template>

    <div class=" p-8 grid gap-7">
        <h1 class=" text-4xl font-bold border-gray-500 ">Articles</h1>

        <div class=" mt-5">
            <SearchForm :handler="sendSearchData"></SearchForm>
        </div>

        <div class="mt-5">
            <ArticleWrapper :data="articles"></ArticleWrapper>
        </div>
    </div>
</template>
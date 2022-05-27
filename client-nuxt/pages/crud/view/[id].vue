<script setup lang="ts">

    import ArticleDto   from '~~/dto/article.dto';
    import ArticleFetch from '~~/fetch/crud/fetch.article';
import ArticleView from '../../../components/crud/ArticleView.vue';

    const articleFetch: ArticleFetch = new ArticleFetch();
    const route = useRoute();
    
    const article = ref<ArticleDto>((await articleFetch.getOne(Number(route.params.id))).getData().article);

    console.log(article.value);
    
</script>



<template>


    <div class="p-8 grid gap-7">
        <div class="grid gap-2">
            <h1 class="text-5xl font-bold">View</h1>
            <h2 class="text-lg text-gray-500">{{article.title}}</h2>
        </div>

        <div class="grid grid-cols-[1fr_800px] gap-20">
            <div>
                <ArticleView :data="article"></ArticleView>
            </div>

            <div>
                <img class="w-full m-h" :src="`http://127.0.0.1:3000/article/${article.img}`" alt="">
            </div>
        </div>
    </div>


</template>
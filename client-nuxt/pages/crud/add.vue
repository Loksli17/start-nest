

<script setup lang="ts">
    import { AxiosResponse }                from 'axios';
    import ArticleForm, { ArticleFormData } from '~~/components/crud/ArticleForm.vue';
    import ArticleDto                       from '~~/dto/article.dto';
    import ArticleFetch                     from '~~/fetch/crud/fetch.article';

    const articleFetch: ArticleFetch = new ArticleFetch();
    
    const handler = async (formData: ArticleFormData) => {
        
        const article: ArticleDto = {
            img    : "",
            title  : formData.title,
            content: formData.content,
            date   : formData.date,
            time   : formData.time
        };

        const response: AxiosResponse = (await articleFetch.add(article)).getResponse();

        if(response.status == 201) {
            if(process.client) useNuxtApp().$toast.success(`Article was added`);
        } else {
            if(process.client) useNuxtApp().$toast.error(`Error with db`);
        }
    }

</script>


<template>

    <div class="p-8 grid gap-7">

        <div>
            <ArticleForm :handler="handler"></ArticleForm>
        </div>
    </div>
    
</template>
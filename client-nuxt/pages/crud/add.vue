

<script setup lang="ts">
    import ArticleForm  from '~~/components/crud/ArticleForm.vue';
    import ArticleFetch from '~~/fetch/crud/fetch.article';

    const articleFetch: ArticleFetch = new ArticleFetch();
    
    const handler = async (formData: Record<string, any>) => {
        await articleFetch.add(formData);
    }

</script>


<template>

    <div class="p-8 grid gap-7">

        <div>
            <ArticleForm :handler="handler"></ArticleForm>
        </div>
    </div>
    
</template>
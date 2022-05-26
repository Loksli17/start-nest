
<script setup lang="ts">

    import ArticleDto from '~~/dto/article.dto';
import Article from './Article.vue';

    defineProps<{
        data: Array<ArticleDto>
    }>();

</script>


<template>

    <div class=" text-3xl" v-if="data.length == 0">
        No articles yet =(((
    </div>

    <div class="grid gap-2 " else>

        <Article v-for="item in data" :data="item" ></Article>
    </div>

</template>
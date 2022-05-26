
<script setup lang="ts">

    import ArticleDto from '~~/dto/article.dto';
    import Article    from './Article.vue';

    defineProps<{
        data: Array<ArticleDto>
    }>();

</script>


<template>

    <div class=" text-3xl" v-if="data.length == 0">
        No articles yet =(((
    </div>

    <div v-else class="grid gap-4" >

        <div class="grid p-4 bg-green-200 rounded-md gap-2 items-center grid-cols-[100px_1fr_1fr_1fr_1fr_138px] font-bold text-lg">
            <div>
                ID
            </div>
            
            <div>
                Title
            </div>

            <div>
                Tags
            </div>

            <div>Time</div>

            <div>Date</div>

            <div>Actions</div>
        </div>

        <Article v-for="item in data" :data="item" ></Article>
    </div>

</template>
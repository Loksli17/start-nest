<script setup lang="ts">

    import ArticleDto from '~~/dto/article.dto';

    defineProps<{
        data: ArticleDto
    }>();

</script>


<template>

    <div class=" grid gap-2 grid-flow-col">
        <div>
            {{data.id}}
        </div>

        <div>
            {{data.content}}
        </div>
    </div>
</template>
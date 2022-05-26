<script setup lang="ts">

    import ArticleDto from '~~/dto/article.dto';
    import TagWrapper from './TagWrapper.vue';

    defineProps<{
        data: ArticleDto
    }>();

</script>


<template>

    <div class=" grid p-4 bg-gray-100 rounded-md gap-2 items-center grid-cols-[100px_1fr_1fr_1fr_1fr_max-content]">
        
        <div class="h-max-content">
            {{data.id}}
        </div>

        <div class="h-max-content">
            {{data.content}}
        </div>

        <div class="h-max-content">
            <TagWrapper :tags="data.tags"></TagWrapper>
        </div>

        <div class="h-max-content">
            {{data.time}}
        </div>

        <div class="h-max-content">
            {{data.date}}
        </div>

        <div class="grid gap-2 grid-flow-col">
            <div>
                <button class=" bg-green-500 text-white py-2 px-3 rounded-sm text-lg hover:bg-green-700 transition-all">Edit</button>
            </div>

            <div>
                <button class=" bg-red-500 text-white py-2 px-3 rounded-sm text-lg hover:bg-red-700 transition-all">Delete</button>
            </div>
        </div>
    </div>
</template>
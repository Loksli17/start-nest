<script setup lang="ts">

    import ArticleDto from '~~/dto/article.dto';
    import TagWrapper from './TagWrapper.vue';

    defineProps<{
        data         : ArticleDto,
        deleteHandler: (id: number) => {},
    }>();

</script>


<template>

    <div class=" grid p-4 bg-gray-100 rounded-md gap-2 items-center grid-cols-[100px_1fr_1fr_1fr_1fr_max-content]">
        
        <div class="h-max-content">
            {{data.id}}
        </div>

        <div class="h-max-content">
            {{data.title}}
        </div>

        <div class="h-max-content">
            <TagWrapper v-if="data.tags.length != 0" :tags="data.tags"></TagWrapper>
            <div v-else>No Tags :(</div>
        </div>

        <div class="h-max-content">
            {{data.time}}
        </div>

        <div class="h-max-content">
            {{data.date}}
        </div>

        <div class="grid gap-2 grid-flow-col">

            <div class=" h-[50px]">
                <nuxt-link :to="`/crud/file/${data.id}`" class=" block bg-blue-500 rounded px-2 text-white h-full text-lg hover:bg-blue-700 transition-all leading-[50px]">File</nuxt-link>
            </div>

            <div class=" h-[50px]">
                <nuxt-link :to="`/crud/view/${data.id}`" class=" block bg-blue-500 rounded px-2 text-white h-full text-lg hover:bg-blue-700 transition-all leading-[50px]">View</nuxt-link>
            </div>

            <div class=" h-[50px]">
                <nuxt-link :to="`/crud/edit/${data.id}`" class=" block bg-green-500 rounded px-2 text-white h-full text-lg hover:bg-green-700 transition-all leading-[50px]">Edit</nuxt-link>
            </div>

            <div class=" h-[50px]">
                <button @click="deleteHandler(data.id)" class=" bg-red-500 text-white  rounded text-lg px-2 h-full hover:bg-red-700 transition-all ">Delete</button>
            </div>
        </div>
    </div>
</template>
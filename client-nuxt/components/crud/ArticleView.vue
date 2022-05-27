<script setup lang="ts">

    import ArticleDto from '~~/dto/article.dto';

    defineProps<{
        data: any;
    }>();

</script>


<template>

    <div class="border-2 border-green-400">
        <div v-for="(value, name) in data" class="grid grid-cols-[200px_1fr] border-green-400 even:bg-gray-200 odd:bg-gray-100 border-t-2 first:border-t-0">
            
            <div class="p-5 font-bold text-xl border-r-2 border-green-400" >{{name}}</div>
            
            <div class="p-5" v-if="typeof value == 'object'">
                <div class="p-3 bg-green-400 text-white text-lg w-max text-lg" v-for="tag in value">
                    {{tag.content}}
                </div>
            </div>

            <div class="p-5" v-else>{{value}}</div>
        </div>
    </div>
    


</template>
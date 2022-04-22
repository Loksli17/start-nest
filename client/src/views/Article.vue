
<template>
    <div class="pt-24 pb-14">

        <div class="px-12">
            <h1 class=" text-5xl font-bold">Article</h1>
        </div>

        <div class="mt-11 grid grid-cols-article-wrap">

            <div class="grid grid-flow-row grid-cols-1 gap-4 px-12">
                <div class=" py-3 px-4 bg-gray-300 w-full box-border cursor-pointer" v-for="tag in tags" :key="tag.id" @click="tagClick(tag)">
                    {{tag.content}}
                </div>
            </div>

            <div class="">
                kek
            </div>
        </div>

        
    </div>
</template>


<script lang="ts">
    
    import axios, { AxiosResponse } from 'axios';
    import { defineComponent, Ref, ref } from 'vue';


    export default defineComponent({
        
        setup(){

            const basicUrl = "127.0.0.1:3000";

            let 
                tagIds: Ref<Array<number>>                  = ref([]),
                tags  : Ref<Array<Record<string, unknown>>> = ref([]);


            const 
                getTags = () => {
                    axios.get(`http://${basicUrl}/tag/get-all`).then((response: AxiosResponse) => {
                        tags.value = response.data.tags;
                    });
                },

                tagClick = (tag: {id: number, content: string}) => {
                    tagIds.value.push(tag.id);
                    console.log(tagIds);
                },

                getArticles = () => {
                    axios.post(`http://${basicUrl}/article/get-all`).then((response: AxiosResponse) => {
                        console.log(response);
                    })
                };


            getTags();


            return {
                tags,

                tagClick
            }
        }
    })
</script>

<template>
    <div class="page-wrapper">

        <div class="header">
            <h1>Article</h1>
        </div>

        <div class="content-wrap">

            <div class="col-1">
                <div class="tag" v-for="tag in tags" :key="tag.id" @click="addFilterTag(tag)">
                    {{tag.content}}
                </div>
            </div>

            <div class="col-2">

                <div v-if="filterTags.size > 0" class="filter-tags-wrap">
                    <div class="filter-tag"  v-for="tag in filterTags" :key="tag.id" @click="removeFilterTag(tag)">
                        {{tag.content}}
                    </div>
                </div>

                <div class="article-tags-wrap">
                    kek
                </div>

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
                filterTags: Ref<Set<Record<string, unknown>>> = ref(new Set()),
                tags      : Ref<Array<Record<string, unknown>>> = ref([]);


            const 
                getTags = () => {
                    axios.get(`http://${basicUrl}/tag/get-all`).then((response: AxiosResponse) => {
                        tags.value = response.data.tags;
                    });
                },

                addFilterTag = (tag: {id: number, content: string}) => {
                    filterTags.value.add(tag);
                    getArticles();
                },

                removeFilterTag = (tag: {id: number, content: string}) => {
                    filterTags.value.delete(tag);
                },

                getArticles = () => {
                    let tagIds: Array<number> = [];

                    filterTags.value.forEach((tag: Record<string, any>) => {
                        tagIds.push(tag.id);
                    });

                    axios.get(`http://${basicUrl}/article/get-all?tagIds=${tagIds.join(',')}`).then((response: AxiosResponse) => {
                        console.log(response);
                    })
                };

            getTags();
            getArticles();


            return {
                tags,
                filterTags,

                addFilterTag,
                removeFilterTag,
            }
        }
    })
</script>



<style lang="scss">
    
    .page-wrapper{
        margin-top: 90px;
        padding: 0px 50px;
    }

    .header{
        font-size: 40px;
        font-weight: bold;
    }

    .content-wrap{
        display: grid;
        grid-template-columns: 350px auto;
        column-gap: 50px;
        margin-top: 40px;

        .col-1{
            display: grid;
            row-gap: 20px;
            max-width: 100%;

            .tag{
                padding: 13px 15px;
                background: rgb(231, 228, 228);
                border-radius: 10px;
                cursor: pointer;

                &:hover{
                    transition: .4s;
                    background: rgb(196, 190, 190);
                }
            }
        }

        .col-2{

            .filter-tags-wrap{
                display: grid;
                grid-auto-flow: column;
                grid-auto-columns: max-content;
                column-gap: 15px;
                margin-bottom: 40px;
                // grid-template-columns: repeat(auto-fit, minmax(max-content, 100px));

                .filter-tag{
                    font-size: 18px;
                    border: 1px solid rgb(41, 215, 228);
                    border-radius: 8px;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 10px;
                    cursor: pointer;

                    &:hover{
                        background: rgb(41, 215, 228);
                        transition: .4s;
                    }
                }
            }

            .article-tags-wrap{
              
            }
        }
    } 

</style>
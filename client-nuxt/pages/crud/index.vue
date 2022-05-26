
<script setup lang="ts">

    import { FormKitSchema } from "@formkit/vue";
    import ArticleFetch      from "~~/composables/crud/fetch.article";

    const articleFetch: ArticleFetch = new ArticleFetch(); 

    const schema = [
        {
            $formkit   : "text",
            name       : "searchData",
            placeholder: "Input article title..",

            classes: {
                outer: 'new-outer-class',
                inner: {
                    $reset: true, // resets classes on the "inner" section
                    'border-gray-400': true
                }
            },
        }
    ];

    const formData = { searchData: "" };

    const sendSearchData = async () => {
        console.log(articleFetch.searchArticle(formData.searchData));
    };

</script>



<template>

    <div class=" p-8 grid gap-7">
        <h1 class=" text-4xl font-bold border-gray-500 ">Articles</h1>

        <div>
            <FormKit
                type="form"
                v-model="formData"
                @submit="sendSearchData"
                submit-label="Search"
                :config="{
                    classes: {
                        input: ' border-2 rounded-md border-gray-400 p-3 text-md text-green-800'
                    },
                }"
                :submit-attrs="{
                    'input-class': 'bg-green-400 py-3 px-5 text-xl mt-6 rounded-md text-white transition-all hover:bg-green-500',
                }"
            >
                <FormKitSchema :schema="schema" />
            </FormKit>
        </div>
    </div>
</template>
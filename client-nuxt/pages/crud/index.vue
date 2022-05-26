
<script setup lang="ts">
    import SearchForm   from "~~/components/crud/SearchForm.vue";
    import ArticleFetch from "~~/composables/crud/fetch.article";

    const articleFetch: ArticleFetch = new ArticleFetch(); 

    // const schema = [
    //     {
    //         $formkit   : "text",
    //         name       : "searchData",
    //         placeholder: "Input article title..",

    //         classes: {
    //             outer: 'new-outer-class',
    //             inner: {
    //                 $reset: true, // resets classes on the "inner" section
    //                 'border-gray-400': true
    //             }
    //         },
    //     }
    // ];

    // const formData = { searchData: "" };

    const sendSearchData = async (data: string) => {
        console.log(await articleFetch.searchArticle(data));
    };

</script>



<template>

    <div class=" p-8 grid gap-7">
        <h1 class=" text-4xl font-bold border-gray-500 ">Articles</h1>

        <div>
            <SearchForm :handler="sendSearchData"></SearchForm>
        </div>
    </div>
</template>
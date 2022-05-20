
<script setup lang="ts">

    import { FormKitSchema } from "@formkit/vue";

    const schema = [
        {
            $formkit: "text",
            name    : "searchData",
        }
    ];

    const formData = { searchData: "" };

    const sendSearchData = () => {
        console.log(formData);
    };

</script>


<template>

    <div class=" p-8 grid gap-7">
        <h1 class=" text-4xl font-bold">Articles</h1>

        <div>
            <FormKit
                type="form"
                v-model="formData"
                @submit="sendSearchData"
                :submit-attrs="{
                    'input-class': 'bg-green-400 py-2 px-4 mt-4 rounded-md text-white transition-all hover:bg-green-500'
                }"
            >
                <FormKitSchema :schema="schema" />
            </FormKit>
        </div>
    </div>
</template>
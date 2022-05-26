<script setup lang="ts">

    import { FormKitSchema } from "@formkit/vue";

    defineProps<{
        handler: (searchData: string) => {},
    }>();

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
</script>


<template>

    <FormKit
        type="form"
        v-model="formData"
        @submit="handler(formData.searchData)"
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

</template>


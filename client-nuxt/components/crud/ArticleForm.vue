<script setup lang="ts">

    import { FormKitSchema } from "@formkit/vue";

    export interface ArticleFormData {
        date   : Date, 
        time   : string,
        title  : string,
        content: string,
    }

    defineProps<{
        handler: (formData: Record<string, any>) => void,
    }>();


    const schema = [

        {
            $el: "h1",
            children: "Article",
            attrs: {
                class: 'text-4xl font-bold',
            }
        },

        {
            $formkit: "text",
            name    : "title",
            label   : "Title",
        },

        {
            $el: 'div',
            attrs: {
                class: ' grid grid-cols-2 gap-4',
            },
            children: [
                {
                    $formkit: "date",
                    label   : "Date",
                    name    : "date",
                },
                {
                    $formkit: "time",
                    label   : "Time",
                    name    : 'time',
                },
            ],
        },

        {
            $formkit: "textarea",
            name    : "content",
            label   : "Content",
        },

    ];

    const formData: ArticleFormData = {
        date   : new Date(), 
        time   : "",
        title  : "",
        content: "",
    };

</script>


<template>

    <FormKit
        type="form"
        v-model="formData"
        submit-label="Send Article"
        @submit="handler(formData)"
        :config="{
            classes: {
                input: ' border-2 rounded-md border-gray-400 p-3 text-md text-green-800 w-full mt-1',
                form : 'w-[800px] grid gap-6',
                label: 'font-bold text-lg',
            },
        }"
        :submit-attrs="{
            'input-class': 'bg-green-400 py-3 px-5 text-xl mt-6 rounded-md text-white transition-all hover:bg-green-500',
        }"
    >
        <FormKitSchema :schema="schema" />
    </FormKit>
</template>
<script setup lang="ts">

    import TagDto from '~~/dto/tag.dto';

    defineProps<{
        tag: TagDto,
    }>();

</script>


<template>

    <div class=" p-2 bg-green-400 text-white rounded-md font-bold">
        {{tag.content}}
    </div>
    
</template>
<script setup lang="ts">

    import TagDto from '~~/dto/tag.dto';
    import Tag    from './Tag.vue';

    defineProps<{
        tags: Array<TagDto>,
    }>();

</script>


<template>


    <div class="grid grid-cols-[max-content_max-content_max-content_max-content] auto-cols-max gap-1">
        <Tag :tag="tag" v-for="tag in tags"></Tag>
    </div>
    
</template>
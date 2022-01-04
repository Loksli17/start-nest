<template>
    <div class="home">
        
        <h1>Todo list</h1>
        <button class="new-btn">New task</button>

        <div class="task-wrapper">
            <div class="task" v-for="task in tasks" :key="task.id">
                <span class="text">{{task.text}}</span>
                <span>{{task.date}}</span>
                <span>{{task.time}}</span>
                <span>{{task.taskTypeId}}</span>

                <button>Edit</button>
                <button>Remove</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import axios, { AxiosResponse }                         from 'axios';


export default defineComponent({
    name: 'Home',

    setup(){
        let tasks: Ref<Array<Record<string, any>>> = ref([]);
        
        axios.get('http://localhost:3000/task/get-all').then((response: AxiosResponse) => {
            tasks.value = response.data.tasks;
        });

        return {
            tasks
        };
    }
});

</script>


<style lang="scss">

    *{
        margin: 0px;
        padding: 0px;
    }

    .new-btn{
        margin: 30px 0px;
    }

    body {
        background: rgb(245, 243, 243);
    }

    .task-wrapper{
        display: grid;
        row-gap: 20px;
        justify-content: center;
        
        .task{
            width: 900px;
            padding: 10px 20px;
            
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: 3fr max-content max-content max-content max-content;
            column-gap: 10px;
            background: #fff;

            button{
                cursor: pointer;
            }

            .text{
                text-align: left;
            }
        }
    }
</style>
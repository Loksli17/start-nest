<template>
    <div class="">
        
        <div class="">
            <h1 class=" text-5xl font-bold">Todolist</h1>
        </div>

        <div class=" mt-6">
            <button class="p-4 w-max bg-blue-500  text-white text-lg" @click="newTask">New task</button>
        </div>

        <div class=" mt-14 grid gap-5 md:grid-cols-1">
            <div class="grid grid-flow-col grid-cols-todo bg-gray-100 p-6" v-for="task in tasks" :key="task.id">
                <span class="text text-blue-600">{{task.text}}</span>
                <span>{{task.date}}</span>
                <span>{{task.time}}</span>
                <span>{{task.taskTypeId}}</span>

                <div class="grid grid-flow-col auto-cols-max gap-3">
                    <button>&#9998;</button>
                    <button class=" text-red-500" @click="removeTask(task.id)">&#10006;</button>
                </div>
            </div>
        </div>
    </div>

<!-- 
    <div class="modal-back">

        <form>
            <input type="text" name="text" v-model="text" id="">
            
            <select name="taskTypeId">
                <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
            </select>
        </form>
    </div> -->
    
</template>



<script lang="ts">
    import { defineComponent, ref, Ref } from 'vue';
    import axios, { AxiosResponse }      from 'axios';


    export default defineComponent({
        name: 'Home',

        setup(){

            const 
                newTask = () => {
                    axios.put('http://localhost:3000/task/add', {task: {text: 'Teeeext', taskTypeId: 1}}).then((response: AxiosResponse) => {
                        console.log(response);
                        return response
                    }).then(() => {
                        getTasks();
                    });
                },

                getTasks = () => {
                    axios.get('http://localhost:3000/task/get-all').then((response: AxiosResponse) => {
                        tasks.value = response.data.tasks;
                    });
                },

                removeTask = (id: number) => {
                    axios.delete(`http://localhost:3000/task/remove/${id}`).then((response: AxiosResponse) => {
                        console.log(response);
                        return response;
                    }).then(() => {
                        getTasks();
                    });
                },

                getTypes = () => {
                    axios.get(`http://localhost:3000/task-type/get-all`).then((response: AxiosResponse) => {
                        types.value = response.data.types;
                        console.log(types.value);
                    });
                };

            let 
                id   : Ref<number>                     = ref(1),
                text : Ref<string>                     = ref(''),
                types: Ref<Array<Record<string, any>>> = ref([]),
                tasks: Ref<Array<Record<string, any>>> = ref([]);

            getTasks();
            getTypes();

            return {
                tasks,
                types,

                newTask,
                getTasks,
                removeTask,
                text,
                id
            };
        }
    });

</script>
<template>
    <div class="">
        
        <div class="">
            <h1 class=" text-5xl font-bold">Todolist</h1>
        </div>

        <div class=" mt-6">
            <button class="p-4 w-max bg-blue-500  text-white text-lg" @click="showNewModal()">New task</button>
        </div>

        <div class=" mt-14 grid gap-5 md:grid-cols-1">
            <div class="grid grid-flow-col grid-cols-todo bg-gray-100 p-6" v-for="task in tasks" :key="task.id">
                <span class="text text-blue-600">{{task.text}}</span>
                <span>{{task.date}}</span>
                <span>{{task.time}}</span>
                <span>{{task.taskTypeId}}</span>

                <div class="grid grid-flow-col auto-cols-max gap-3">
                    <button @click="showEditModal(task.id)">&#9998;</button>
                    <button class=" text-red-500" @click="removeTask(task.id)">&#10006;</button>
                </div>
            </div>
        </div>
    </div>


    <div @click.self="modalToggle = false" class="grid justify-center items-center fixed w-full h-full z-1 bg-gray-800 opacity-90 top-0 left-0" :class="{'hidden': !modalToggle}">

        <form class=" bg-white p-8 grid gap-10 opacity-100">
            <input class="cursor-pointer border-2 border-gray-600 p-3" type="text" name="text" v-model="text" id="">
            
            <select class="cursor-pointer border-2 border-gray-600 p-3" v-model="typeId" name="taskTypeId">
                <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
            </select>

            <input class=" p-4 bg-blue-500 text-white cursor-pointer" type="submit" @click.prevent="submitClick" value="Send task">
        </form>
    </div>
    
</template>



<script lang="ts">
    import { defineComponent, ref, Ref, watch } from 'vue';
    import axios, { AxiosResponse }      from 'axios';


    export default defineComponent({
        name: 'Home',

        setup(){

            let
                actionStatus: Ref<string>                     = ref('add'),
                modalToggle : Ref<boolean>                    = ref(false),
                id          : Ref<number>                     = ref(1),
                text        : Ref<string>                     = ref('Text..'),
                typeId      : Ref<number>                     = ref(1),
                types       : Ref<Array<Record<string, any>>> = ref([]),
                tasks       : Ref<Array<Record<string, any>>> = ref([]);


            const
            
                newTask = () => {
                    axios.put('http://localhost:3000/task/add', {task: {text: text.value, taskTypeId: typeId.value}}).then((response: AxiosResponse) => {
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

                editTask = (id: number) => {
                    axios.put(`http://localhost:3000/task/edit/${id}`, {task: {text: text.value, taskTypeId: typeId.value}}).then((response: AxiosResponse) => {
                        console.log(response);
                    })
                },

                getTypes = () => {
                    axios.get(`http://localhost:3000/task-type/get-all`).then((response: AxiosResponse) => {
                        types.value = response.data.types;
                        console.log(types.value);
                    });
                },


                showEditModal = (id_: number) => {
                    modalToggle.value  = true;
                    actionStatus.value = 'edit';

                    let task: Record<string, any> | undefined = {};

                    task = tasks.value.find((task) => task.id === id_); 

                    id.value     = id_;
                    text.value   = task!.text;
                    typeId.value = task!.taskTypeId;
                },

                showNewModal = () => {
                    modalToggle.value = true;
                    actionStatus.value = 'add';
                },

                submitClick = () => {
                    switch(actionStatus.value){
                        case 'add': 
                            newTask();
                            break;
                        case 'edit':
                            editTask(id.value);
                            break;
                    }
                    modalToggle.value = false;
                };


            getTasks();
            getTypes();

            watch(modalToggle, (value: boolean) => {
                document.body.style.overflowY = value ? 'hidden' : 'auto'; 
            });

            return {
                tasks,
                types,

                newTask,
                getTasks,
                removeTask,
                editTask,

                actionStatus,
                text,
                typeId,
                id,

                modalToggle,

                showEditModal,
                showNewModal,
                submitClick
            };
        }
    });

</script>
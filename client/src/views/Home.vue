<template>

    <CustomScroll v-model:show-scroll="showScroll" :body="true">
        <div class="pt-24 pb-14">
            
            <div class="px-10">
                <h1 class=" text-5xl font-bold">Todolist</h1>
            </div>

            <div class="mt-6 px-10">
                <button class="p-4 w-max bg-blue-500  text-white text-lg" @click="showNewModal()">New task</button>

                <select class="cursor-pointer border-2 border-gray-600 p-4 ml-5 text-lg" v-model="filterTypeId" name="taskTypeId">
                    <option value="all">All</option>
                    <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
                </select>
            </div>

            <div class="mt-14 px-10 grid gap-5 md:grid-cols-1">
                <div class="grid grid-flow-col grid-cols-todo bg-gray-100 p-6" v-for="task in tasks" :key="task.id">
                    <span class="text text-blue-600">{{task.text}}</span>
                    <span>{{task.date}}</span>
                    <span>{{task.time}}</span>

                    <span v-if="task.taskTypeId == 1" class=" text-yellow-400"> {{task.type.name}} </span>
                    <span v-if="task.taskTypeId == 2" class=" text-green-400"> {{task.type.name}} </span>
                    <span v-if="task.taskTypeId == 3" class=" text-blue-400"> {{task.type.name}} </span>
                    <span v-if="task.taskTypeId == 4" class=" text-indigo-400"> {{task.type.name}} </span>

                    <div class="grid grid-flow-col auto-cols-max gap-3">
                        <button @click="showEditModal(task.id)">&#9998;</button>
                        <button class=" text-red-500" @click="removeTask(task.id)">&#10006;</button>
                    </div>
                </div>
            </div>
        </div>
    </CustomScroll>
    

    <div @click.self="modalToggle = false" class="grid justify-center items-center fixed z-50 w-full h-full z-1 bg-gray-800 opacity-90 top-0 left-0" :class="{'hidden': !modalToggle}">

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
    import { defineComponent, ref, Ref, watch, inject } from 'vue';
    import axios, { AxiosResponse }                     from 'axios';
    import { ToastPluginApi }                           from 'vue-toast-notification';
    import CustomScroll                                 from '../components/CustomScroll/CustomScroll.vue';
    import 'tw-elements';


    export default defineComponent({
        name: 'Home',

        components: {
            CustomScroll,
        },
        

        setup(){

            const basicUrl = "127.0.0.1:3000";

            let
                filterTypeId: Ref<string>                     = ref("all"),
                showScroll  : Ref<boolean>                    = ref(true),
                Toast       : ToastPluginApi                  = inject('Toast') as ToastPluginApi,
                actionStatus: Ref<string>                     = ref('add'),
                modalToggle : Ref<boolean>                    = ref(false),
                id          : Ref<number>                     = ref(1),
                text        : Ref<string>                     = ref('Text..'),
                typeId      : Ref<number>                     = ref(1),
                types       : Ref<Array<Record<string, any>>> = ref([]),
                tasks       : Ref<Array<Record<string, any>>> = ref([]);


            const
                newTask = () => {
                    axios.put(`http://${basicUrl}/task/add`, {task: {text: text.value, taskTypeId: typeId.value}}).then((response: AxiosResponse) => {
                        return response;
                    }).then(() => {
                        const type: string = types.value.find(value => value.id == typeId.value)!.name;
                        Toast.success(`New ${type} task was created!`);
                        getTasks(filterTypeId.value);
                    });
                },

                getTasks = (filter: string | number) => {
                    axios.get(`http://${basicUrl}/task/get-all?filter=${filter}`).then((response: AxiosResponse) => {
                        tasks.value = response.data.tasks;
                    });
                },

                removeTask = (id: number) => {
                    axios.delete(`http://${basicUrl}/task/remove/${id}`).then((response: AxiosResponse) => {
                        return response;
                    }).then(() => {
                        Toast.success(`Task with id = ${id} was removed!`);
                        getTasks(filterTypeId.value);
                    });
                },

                editTask = (id: number) => {
                    axios.put(`http://${basicUrl}/task/edit/${id}`, {task: {text: text.value, taskTypeId: typeId.value}}).then((response: AxiosResponse) => {
                        tasks.value.map((task: Record<string, any>) => {
                             
                            if(task.id == id){
                                task.text       = response.data.task.text;
                                task.taskTypeId = response.data.task.taskTypeId;
                                task.type       = {id: response.data.task.taskTypeId, name: types.value.find(value => value.id == response.data.task.taskTypeId)!.name};
                            }

                            return task;
                        });

                        Toast.success(`Task with id = ${id} was edited!`);
                    })
                },

                getTypes = () => {
                    axios.get(`http://${basicUrl}/task-type/get-all`).then((response: AxiosResponse) => {
                        types.value = response.data.types;
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


            getTasks(filterTypeId.value);
            getTypes();

            watch(modalToggle, (value: boolean) => {
                showScroll.value = !value;
            });

            watch(filterTypeId, (value: any) => {
                getTasks(value);
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
                filterTypeId,
                id,

                modalToggle,

                showEditModal,
                showNewModal,
                submitClick,

                showScroll
            };
        }
    });

</script>
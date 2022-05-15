<script setup lang="ts">
    import useLogin           from '~~/composables/login';
    import { useCurrentTodo } from '~~/store/currentTodo';
    import { useUserStore }   from '~~/store/user';

    const todoStore   = useCurrentTodo();
    const userStore   = useUserStore();
    const currentTodo = todoStore.currentTodo;

    useHead({
        title: "Index",
        meta: [
            { name: "description",    content: "Cool index page description" },
            { name: "og:title",       content: "Cool site | Index" },
            { name: "og:description", content: "Cool index page description" }
        ]
    });

    const showModal = ref(false);

    const toggleModal = () => {
        showModal.value = !showModal.value;
    }

    const logout = () => {
        userStore.reset();
    }
</script>

<template>
    <div class="grid grid-flow-row gap-y-2 m-2">
        <div class="p-4 rounded bg-slate-500">
            <h1 class="font-medium text-[20px]">Test</h1>

            <div class=" grid grid-flow-col gap-x-1 grid-cols-5">            
                <CustomLink to="/about">about</CustomLink>
                <CustomLink to="/chats">chats</CustomLink>
                <CustomLink to="/graphics">graphcs</CustomLink>
                <CustomLink to="/parent/child">child</CustomLink>
                <CustomLink to="/todo/todolist">todolist</CustomLink>
                <CustomLink to="/list">list</CustomLink>
                <CustomLink to="/users/admins/69">test</CustomLink>
            </div>
        </div>


        <div class="p-4 rounded bg-slate-500">
            <h1 class="font-medium text-[20px]">Current todo</h1>

            <div class="grid grid-flow-row gap-y-1 p-3 rounded">
                <Todo :todo="currentTodo" />
            </div>

            <CustomButton @click="toggleModal">show modal</CustomButton>
            <CustomButton @click="logout">logout</CustomButton>
        </div>

        <Modal 
            :show-modal="showModal"
            :close-modal="() => { showModal = false }"
            >
            <!-- 'ModalComponents' part is because of auto-import -->
            <ModalComponentsAuthModal />
        </Modal>
    </div>
</template>

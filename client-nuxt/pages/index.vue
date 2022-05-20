<script setup lang="ts">
    // import useLogin           from '~~/composables/login';
    // import { useCurrentTodo } from '~~/store/currentTodo';
    // import { useUserStore }   from '~~/store/user';

    // const todoStore   = useCurrentTodo();
    // const userStore   = useUserStore();
    // const currentTodo = todoStore.currentTodo;

    // useHead({
    //     title: "Index",
    //     meta: [
    //         { name: "description",    content: "Cool index page description" },
    //         { name: "og:title",       content: "Cool site | Index" },
    //         { name: "og:description", content: "Cool index page description" }
    //     ]
    // });

    const showModal = ref(false);

    const toggleModal = () => {
        showModal.value = !showModal.value;
    }

    // const logout = () => {
    //     userStore.reset();
    // }
</script>


<template>
    <div>
        <div>
            <h1 class="text-lg">Test</h1>
            <h4 class="text-sm text-gray-100 bg-slate-900">If I have this then help message in the form works, why</h4>

            <div class=" grid grid-flow-col gap-x-1 grid-cols-5">
                <CustomLink to="/graphics">graphcs</CustomLink>
                <CustomLink to="/parent/child">child</CustomLink>
                <CustomLink to="/todo/todolist">todolist</CustomLink>
                <CustomLink to="/users/admins/69">test</CustomLink>
            </div>
        </div>

        <CustomButton @click="toggleModal">show modal</CustomButton>

        <Modal 
            :show-modal="showModal"
            :close-modal="() => { showModal = false }"
            >
            <!-- 'ModalComponents' part is because of auto-import -->
            <ModalComponentsAuthModal />
        </Modal>
    </div>
</template>

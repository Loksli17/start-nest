<script setup lang="ts">
    import { FormKitSchema } from "@formkit/vue";
    import useLogin          from '~~/composables/login';
    import { useUserStore }  from '~~/store/user';

    const userStore = useUserStore();

    const schema = [
        {
            $formkit: "text",
            name: "login",
            label: "Login",
            help: "help message"
        },
        {
            $formkit: "password",
            name: "password",
            label: "Password"
        }
    ];

    interface LoginInfo {
        login:    string;
        password: string;
    }

    const submit = async () => {

        const loginInfo: LoginInfo = {
            login: (formData as any).login,
            password: (formData as any).password
        }

        const { data, error } = await useLogin(loginInfo);

        if (error.value != null) {
            if (process.client) {
                const { $toast } = useNuxtApp();
                $toast.error(`Error: ${error.value}`);
            }

            return;
        }

        if (data.value != null) {
            const { userId, accessToken } = data.value;
            userStore.setUser(userId, accessToken);

            if (process.client) {
                const { $toast } = useNuxtApp();
                $toast.success("Logged in");
            }

            navigateTo("/chats?active=2");
        }
    }

    const formData = {};
</script>

<template>
    <FormKit 
        type="form"
        v-model="formData"
        @submit="submit"
        >
        <h1 class=" text-xl">Login</h1>

        <FormKitSchema :schema="schema" />
    </FormKit>
</template>


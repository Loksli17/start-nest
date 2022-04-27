<script setup lang="ts">
    import { useUserStore } from '~~/store/user';
    const store = useUserStore();

    const randNumber = ref(0);

    const genNumber = () => Math.random() * 100;
    
    const login = async () => {
        try {
            const res = await useFetch("/api/login", {
                method: "POST",
                body: {
                    login: "loksli",
                    password: "123"
                }
            });

            const { userId, jwt } = res.data.value;

            store.setUser(userId, jwt);
        } catch (err) {
            console.error(err);
        }
    }
    
</script>

<template>
    <div>
        <h1>Hi</h1>

        <div>
            <p>{{ randNumber }}</p>
            <CustomButton @click="randNumber++">increment</CustomButton>
            <CustomButton @click="login">Login</CustomButton>
        </div>

        <!-- Client-side render only -->
        <client-only>
            <div class=" bg-blue-900">
                <h1>This is client only</h1>

                <p>number: {{ randNumber }}</p>
            </div>

            <div>
            </div>
        </client-only>

        <nuxt-link to="/parent">to parent</nuxt-link>
    </div>
</template>
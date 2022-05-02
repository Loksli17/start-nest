<script setup lang="ts">

    interface LoginInfo {
        login:    string;
        password: string;
    }
    
    const props = defineProps<{
        modelValue: LoginInfo
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', val: LoginInfo): void
    }>();

    const loginInfoComputed = computed({
        get(): LoginInfo {
            return props.modelValue;
        },
        set(val: LoginInfo) {
            emit("update:modelValue", val);
        }
    })
</script>

<template>
    <div>
        <h1 class=" text-[20px]">Login</h1>
        <form 
            class=" grid grid-flow-row gap-y-2"
            >
            <div class=" grid grid-flow-col gap-x-2">
                <label for="login">Login</label>
                <input id="login" type="text" v-model="loginInfoComputed.login">
            </div>
            <div class="grid grid-flow-col gap-x-2">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="loginInfoComputed.password">
            </div>
        </form>
    </div>
</template>


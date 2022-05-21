<script setup lang="ts">
    definePageMeta({
        middleware: ["test"]
    });



    const testError = () => {
        throwError(new Error("helb"));
    }

    const handleError = () => {
        clearError();
    }
</script>

<template>
    <div>
        <div>
            {{ $route.params.group }}
            {{ $route.params.id }}
        </div>

        <div>
            <NuxtErrorBoundary>
                <ErrorComponent />

                <template #error="{ error }">
                    <div>
                        <span>
                            cool error {{ error }}
                        </span>

                        <CustomButton @click="error = null">Clear error</CustomButton>
                    </div>
                </template>
            </NuxtErrorBoundary>
        </div>

        <button @click="testError">throw error</button>
    </div>
</template>
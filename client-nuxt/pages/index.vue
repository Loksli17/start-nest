
<script setup lang="ts">

</script>

<template>
    <div>
        <h1 class=" text-lg text-sky-500">Header</h1>

        <button
            class="text-xl p-3 rounded border border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-400 focus:border-emerald-900"
            >
            Button
        </button>

        <nuxt-link 
            class=" bg-red-700"
            to="/form">
            to form
        </nuxt-link>

        <nuxt-link
            class=" bg-green-300 text-2xl mx-5 py-3 px-4 rounded-md cursor-pointer hover:bg-green-400 transition-all"
            to="/crud"
        >
        Crud
        </nuxt-link>
    </div>
</template>
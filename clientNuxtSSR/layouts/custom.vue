<template>
    <div class=" grid grid-flow-row gap-y-4 rounded p-4 m-4 bg-slate-600">
        <h1>This is a custom layout, hi</h1>
        <div class="py-2 px-4 rounded bg-slate-800">
            <slot name="header"></slot>
        </div>
        <div class="py-2 px-4 rounded bg-slate-700">
            <slot name="content"></slot>
        </div>
    </div>
</template>
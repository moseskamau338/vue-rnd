<script setup>
// import PanelArea from "./components/PanelArea.vue";
// import PanelEditor from "./components/Panel/PanelEditor.vue";
import PanelArea from "./components/PanelArea.vue";
import PanelEditor from "./components/Panel/PanelEditor.vue";
</script>

<template>
    <section class="mx-20 py-4 h-screen">
        <div class="flex items-center justify-between mt-5">
            <h2>Build Dashboard</h2>
            <div>
                <button class="border border-slate-600 p-1 rounded px-3 flex justify-center items-center hover:bg-slate-200 focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-100">+ Add Panel</button>
            </div>
        </div>
        <div class="mt-20 h-full w-full relative">
            <PanelEditor />
        </div>
    </section>

</template>

<style>

</style>

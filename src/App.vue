<script setup>
import PanelArea from "./components/PanelArea.vue";
import PanelEditor from "./components/Panel/PanelEditor.vue";
import TableLite from "./components/Tables/TableLite.vue";
import { data, columns } from "./library/data";
</script>

<template>
    <div>
        <!--<PanelArea />-->
        <PanelEditor />

        <div class="mx-20">
            <TableLite
                :headers="columns"
                :records="data"
                :total-records="data.length" />
        </div>

    </div>
</template>

<style>

</style>

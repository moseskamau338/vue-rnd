<script setup>
import PanelArea from "./components/PanelArea.vue";
import PanelEditor from "./components/Panel/PanelEditor.vue";
import TableLite from "./components/Tables/TableLite.vue";
import { data, columns } from "./library/data";
import Draggable from "./components/elements/Draggable.vue";
import RevoGrid from "./components/Tables/RevoGrid.vue";
import Gridjs from "./components/Tables/Gridjs.vue";
</script>

<template>
    <div>
        <!--<PanelArea />-->
        <PanelEditor />

        <div class="mx-20">
            <TableLite settings :headers="columns" :records="data" :total-records="data.length" />
        </div>

        <div class="mt-20">
<!--            <RevoGrid />-->
<!--            <Gridjs />-->
        </div>

    </div>
</template>

<style>

</style>

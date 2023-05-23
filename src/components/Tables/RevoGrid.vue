<template>
    <p>Hello Revo</p>
    <div class="w-full h-[200px]">
        <v-grid
          auto-size-column resize
          can-move-columns sort
          theme="material"
          :source="rows"
          :columns="columns"
        ></v-grid>
    </div>
</template>

<script setup>
import VGrid from "@revolist/vue3-datagrid";

const columns = [
        {
          prop: "name",
          name: "First",
          sortable: true,
          order: 'asc'
        },
        {
          prop: "details",
          name: "Second",
        },
      ],
      rows = [
        {
          name: "1",
          details: "Item 1",
        },
        {
          name: "2",
          details: "Item 2",
        },
      ]
</script>

<style scoped>

</style>
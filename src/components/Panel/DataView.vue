<template>
  <TableLite
      :headers="columns"
      :records="data"
      :total-records="data.length" />
</template>

<script setup>
import TableLite from "../Tables/TableLite.vue";
import { data, columns } from "@/library/data.ts";
</script>

<style scoped>

</style>

<template>
<span>Data view</span>
</template>

<script setup>
import axios from "axios";
import { useVueTable, FlexRender } from '@tanstack/vue-table'

const table = useVueTable({})
window['table'] = table

</script>

<style scoped>

</style>

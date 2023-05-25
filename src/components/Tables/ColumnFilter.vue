<script setup>
import helpers from "../../library/helper_functions.js";
import {ref} from "vue";
const props = defineProps({
    column: {required: true, type: Object},
    table: {required: true, type: Object},
})

const firstValue = props.table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(props.column.id)

  const columnFilterValue = ref('')

 const {delayFunction} = helpers

     // @ts-ignore
    let {handleKeydown} = delayFunction({
        delay: 2000,
        onStart: null,
        onEnd: () => {
            props.column.setFilterValue(columnFilterValue.value)
        }
    })

</script>

<template>
    <template v-if="typeof firstValue === 'number'">
        <input type="number"
               @keydown="handleKeydown"
               v-model="columnFilterValue"
                :min="Number(column.getFacetedMinMaxValues()?.[0] ?? '')"
                :max="Number(column.getFacetedMinMaxValues()?.[1] ?? '')"
               placeholder="Search amount ...">
    </template>
    <template v-else>
        <input type="text"
                @keydown="handleKeydown"
               class="focus:ring-green-600 focus:border-green-600 focus:outline-0 block dark:bg-churpy-night-box dark:border-gray-500 p-0.5 rounded text-xs leading-relaxed bg-gray-100 border border-gray-300 text-slate-500 placeholder:text-slate-400"
            v-model="columnFilterValue"
           :placeholder="`Search...`">
    </template>
</template>

<style scoped>

</style>
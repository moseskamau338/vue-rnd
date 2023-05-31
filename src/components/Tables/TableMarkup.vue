<script setup>

import {FlexRender} from "@tanstack/vue-table";
import SvgIcons from "../elements/SvgIcons.vue";
import ColumnFilter from "./ColumnFilter.vue";
import {toRef} from "vue";
import Empty from "../elements/Empty.vue";

const props = defineProps({
    loading:{default:false},
    columnResizeMode:{default:'onChange'},
    side: {default: 'Center', type: String},
    apiControl: Boolean,
    activateColumnFilters: Boolean,
    activateSort: Boolean,
    records:{
      type:Array,
      default:[]
    },
    tableInstance: {required: true, type:Object},
     head_classes: {type:String, default: ''},
     header_cell_classes: {type:String, default: ''},
     row_classes: {type:String, default: ''},
     cell_classes: {type:String, default: ''},
})

const getSortedDirection = (header) => {
    return {asc:{icon:'chevron-up', classes:'fill-slate-600 h-1.5'},
          desc:{icon:'chevron-down', classes:'fill-slate-600 h-1.5'}
      }[header.column.getIsSorted()] ?? {icon:'chevron-both', classes:'fill-slate-400 h-3'}
}

let data = toRef(props,"records");

</script>

<template>
<table class="min-w-full divide-y divide-gray-300 border-2 border-separate border-spacing-0 border-transparent">
    <!-- table header -->
    <thead class="sticky top-0" :class="head_classes">
      <template :key="header_group.id" v-for="header_group in tableInstance[`get${side}HeaderGroups`]()">
          <tr class="py-0">
              <template :key="header.accessorKey" v-for="(header, index) in header_group.headers">
                  <th :colspan="header.colSpan" scope="col" class="group text-left" :class="header_cell_classes">

                      <div class="flex items-center relative group justify-between">

                          <div class="w-full flex items-center">
                              <slot :name="'header_'+header.accessorKey" v-bind:header="header">
                                  <FlexRender
                                    :render="header.column.columnDef.header"
                                    :props="header.getContext()"
                                  ></FlexRender>
                              </slot>
                          </div>
                          <div v-if="activateSort && header.column.getCanSort()" @click="header.column.toggleSorting()"
                               class="p-1 rounded-sm hover:bg-gray-300 transition-all cursor-pointer">
                              <SvgIcons :class="getSortedDirection(header).classes" :name="getSortedDirection(header).icon" />
                          </div>
                        <!-- Resizer -->
                        <!--  <div @mousedown="header.getResizeHandler($event)" :class="`resizer ${-->
                        <!--        header.column.getIsResizing() ? 'isResizing' : ''-->
                        <!--      }`"-->
                        <!--       :style = "{-->
                        <!--        transform:-->
                        <!--          columnResizeMode === 'onEnd' &&-->
                        <!--          header.column.getIsResizing()-->
                        <!--            ? `translateX(${ tableInstance.getState().columnSizingInfo.deltaOffset }px)`-->
                        <!--            : '',-->
                        <!--      }"-->
                        <!--  ></div>-->
                      </div>
                  </th>
              </template>

          </tr>
          <tr class="py-0" v-if="activateColumnFilters">
              <template :key="header.accessorKey" v-for="(header, index) in header_group.headers">
                  <th :colspan="header.colSpan" scope="col" class="group text-left" :class="header_cell_classes">

                      <div v-if="header.column.getCanFilter()" class="flex items-center relative group justify-between">

                          <div class="w-full flex items-center">
                              <ColumnFilter :column="header.column" :table="tableInstance" />
                          </div>

                      </div>
                  </th>
              </template>

          </tr>
      </template>
    </thead>
   <!-- table body -->
   <tbody class="divide-y divide-gray-200 dark:divide-slate-600 bg-white dark:bg-brand-dark/60 h-9 overflow-auto">

        <!-- table row(s) -->
        <template v-if="!loading && data.length > 0" v-for="row in tableInstance.getRowModel().rows" :key="row.id">

          <tr class="transition-all" :class="[
                row_classes,
                row.getIsSelected() ? '!bg-green-100 dark:!bg-green-600 dark:!text-white' : ''
              ]">
              <!-- row data -->
                <td v-for="cell in row[`get${side}VisibleCells`]()" :key="cell.id" class="whitespace-nowrap" :class="cell_classes">
                  <slot :name="cell.id" v-bind:record="row">
                      <FlexRender
                        :render="cell.column.columnDef.cell"
                        :props="cell.getContext()"
                      />
                  </slot>
                </td>
            </tr>

            <slot name="inner_table" v-bind:record="row"></slot>
        </template>

          <tr v-else-if="loading">
            <td colspan="100%">
              <div class="text-center mt-8">
                 <i class="fa-duotone fa-spinner-third animate-spin mr-2"></i>
                 <span class="font-bold mt-4">Processing...</span>
               </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="100%">
                 <Empty />
            </td>
          </tr>
        </tbody>
</table>
</template>

<style scoped>

</style>
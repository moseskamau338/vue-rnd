<template>
    
    <div class="px-4">
     
    <div class="sm:flex sm:items-center">
       <!-- headers -->
      <div class="sm:flex-auto">
        <slot name="header">
            <div class="mt-1 relative" v-if="activateGlobalFilter">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SvgIcons v-if="!initDebounce" name="search" class="fill-slate-500 h-4" />
                <SvgIcons v-else name="spinner" class="text-slate-500 animate animate-spin h-4" />
              </div>
              <input @keydown="handleKeydown" v-model="global_search_filter" type="text" name="search" id="search" class="shadow-sm focus:ring-green-600 focus:border-green-600 block w-96 sm:text-sm border-gray-300 rounded-md pl-10" placeholder="Search records...">
            </div>

        </slot>
      </div>
      <div class="mt-4 sm:mt-0 md:ml-4 sm:ml-16 sm:flex-none">
        <!-- actions -->
        <slot name="actions"></slot>
        <div>
            <button v-if="settings" @click="open_settings=true"
              class="bg-slate-100 h-fit rounded text-slate-500 focus:ring-1 focus:ring-slate-500 leading-none px-4 py-0.5 mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
      </div>
    </div>


    <div class="mt-4 flex flex-col mx-4">

        <div class="relative flex flex-col -space-x-1" id="scrollable" :class="container_classes">
            <template v-for="side in ['Center']">
                <div :class="[
                    side === 'Left' ? 'sticky left-0 z-10' : 'z-[0]'
                ]">
                   <TableMarkup
                       :table-instance="tableInstance"
                       :records="records" :loading="loading" :activate-sort="activateSort"
                       :cell_classes="cell_classes" :head_classes="head_classes"
                       :header_cell_classes="header_cell_classes" :row_classes="row_classes"
                       :side="side" :apiControl="apiControl" :activate-column-filters="activateColumnFilters"
                   />
                </div>
            </template>
        </div>



        <ApiPaginator
                v-if="apiControl"
                :total-records="totalRecords || records.length"
                :initialPageSize="initialPageSize"
                @paginate-records="paginationUpdate" />

        <Paginator v-else :instance="tableInstance" v-if="!removePagination"
                   :initialPageSize="initialPageSize"
                   :totalRecords="totalRecords || records.length"
                   @paginate-records="paginationUpdate" />

        </div>
  </div>

    <TableSettings
      @reOrderColumns="reOrderColumns"
      @close="open_settings = false"
      @pinColumn="togglePinColumn"
      :columnResizeMode="columnResizeMode"
      :columns="tableInstance.getAllLeafColumns()"
      :open="open_settings" />



</template>

<script lang="ts">
import {toRef, ref, computed, h} from "vue";
import Empty from "../elements/Empty.vue";
import Paginator from "./Pagination/Paginator.vue";
import {
    getPaginationRowModel,
    getSortedRowModel,
    getCoreRowModel,
    FlexRender, getFacetedMinMaxValues,
    useVueTable, getFacetedUniqueValues,
    getFilteredRowModel, FilterFn, SortingFn, sortingFns,
} from "@tanstack/vue-table";
import helpers from "../../library/helper_functions.js";
import TableSettings from "./TableSettings.vue";
import {columns} from "../../library/data";
import SvgIcons from "../elements/SvgIcons.vue";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'
import ColumnFilter from "./ColumnFilter.vue";
import TableMarkup from "./TableMarkup.vue";
import ApiPaginator from "./Pagination/ApiPaginator.vue";



declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export default {
  name: "TableLite",
    methods: {
        columns() {
            return columns
        }
    },
  components: {ApiPaginator, TableMarkup, ColumnFilter, SvgIcons, TableSettings, Paginator, Empty, FlexRender},
  props:{
    loading:{default:false},
    settings: Boolean,
    removePagination: Boolean,
    selectable:{default:false, type:Boolean},
    headers:{required:true, type:Array},
    actioned:{default:false, type:Boolean},
    records:{
      type:Array,
      default:[]
    },
    totalRecords: {type: Number},
    apiControl: Boolean,
    activateColumnFilters: Boolean,
    activateGlobalFilter: Boolean,
    activateSort: Boolean,
    initialPageSize: {type:Number},
     container_classes: {type:String, default: 'shadow max-h-[65vh] overflow-y-auto'},
     head_classes: {type:String, default: 'bg-gray-200 z-10 dark:bg-brand-dark whitespace-nowrap'},
     header_cell_classes: {type:String, default: 'px-2 min-w-2 py-3 text-xs font-semibold text-brand-dark dark:text-gray-400'},
     row_classes: {type:String, default: 'dark:hover:bg-gray-300/20 hover:bg-gray-100/60 dark:odd:bg-gray-600 odd:bg-gray-100'},
     cell_classes: {type:String, default: 'px-3 py-1 text-xs text-gray-500 dark:text-gray-300'},
  },
  setup(props, { emit }){
    const {makeTitle, delayFunction} = helpers

    let data = toRef(props,"records");
    let startIndex = ref(0);
    let endIndex = ref(3000);
    let open_settings = ref(false);
    let tableInstance = ref(null)
    let columnResizeMode = ref('onChange')

    //filters
    let global_search_filter = ref('');

    let columns = ref(props.headers.map((header) => {
        return {
          header: header.label || makeTitle(header.key, '_'),
          accessorKey: header.key,
          //resize props
          enableResizing: true,
          minSize: 80
        }
      }))

      if (props.selectable){
          // @ts-ignore
          //Add selection options
          columns.value = [
              {
                id: 'select',
                enableColumnFilter: false,
                enableSorting: false,
                header: ({ table }) => {
                  return h('div', { class: 'px-1 h-6 w-6 flex items-center justify-center text-center w-full' }, [
                       h('input', {
                          type:'checkbox',
                          checked: table.getIsAllRowsSelected(),
                          indeterminate: table.getIsSomeRowsSelected(),
                          onChange: table.getToggleAllRowsSelectedHandler(),
                          class: 'w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        })
                  ]);
                },
                cell: ({ row }) => {
                  return h('div', { class: 'px-1 h-5 w-5' }, [
                    h('input', {
                      type:'checkbox',
                      checked: row.getIsSelected(),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                      class: 'w-4 h-4 text-green-600 bg-gray-50 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    })
                  ]);
                }
              },
              ...columns.value
          ]
      }

      const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
          console.log('Called, fuzzyFilter', value)
          // Rank the item
          const itemRank = rankItem(row.getValue(columnId), value)

          // Store the itemRank info
          addMeta({
            itemRank,
          })

          // Return if the item should be filtered in/out
          return itemRank.passed
        }
      const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
          let dir = 0

          // Only sort by rank if the column has ranking information
          if (rowA.columnFiltersMeta[columnId]) {
            dir = compareItems(
              rowA.columnFiltersMeta[columnId]?.itemRank!,
              rowB.columnFiltersMeta[columnId]?.itemRank!
            )
          }

          // Provide an alphanumeric fallback for when the item ranks are equal
          return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
      }

      // @ts-ignore
      tableInstance.value = useVueTable({
      data: props.records,
      columns: columns.value,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: props.apiControl,
        //paginate
      getPaginationRowModel: getPaginationRowModel(),
        //sort
      getSortedRowModel: getSortedRowModel(),
      //filters
      filterFns: {
        fuzzy: fuzzyFilter,
      },

      getFilteredRowModel: getFilteredRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFacetedMinMaxValues: getFacetedMinMaxValues(),

      // row selection
      // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
      enableRowSelection: true, //enable row selection for all rows
      enableMultiRowSelection: true,

      debugTable: true,
      debugHeaders: true,
      debugColumns: false,
    }); // our tanstack table instance

      window.table = tableInstance.value

      // @ts-ignore
    let {initDebounce, handleKeydown} = delayFunction({
        delay: 0,
        onStart: null,
        onEnd: () => tableInstance.value.setGlobalFilter(global_search_filter.value)
    })



    function paginationUpdate(paginatorInfo){
      emit("paginationQueryInfo", {info: paginatorInfo});
      //const { start, end, currentPage, currentPageSize } = paginatorInfo;

      // Update the start and end indexes
      // startIndex.value = start;
      // endIndex.value = end;

      /**
       * @TODO: do the fetching here to get the updated paginated data
       */
    }

    const reOrderColumns = (columns) => {
        tableInstance.value.setColumnOrder(
          columns.map(d => d.id)
        )
      }

    const togglePinColumn = (payload) => {
        let column = tableInstance.value.getColumn(payload.column.id)
        if (column.getIsPinned() === payload.side){
            column.pin(false)
        }else{
          column.pin(payload.side)
        }
    }

    const getSortedDirection = (header) => {
        return {asc:{icon:'chevron-up', classes:'fill-slate-600 h-1.5'},
              desc:{icon:'chevron-down', classes:'fill-slate-600 h-1.5'}
          }[header.column.getIsSorted()] ?? {icon:'chevron-both', classes:'fill-slate-400 h-3'}
    }

    return {
        tableInstance,reOrderColumns, columnResizeMode,

        initDebounce, handleKeydown, togglePinColumn,
        makeTitle, open_settings, getSortedDirection,
        data, paginationUpdate, global_search_filter,
        startIndex, endIndex,
    }

  }

}
</script>

<style scoped>

</style>
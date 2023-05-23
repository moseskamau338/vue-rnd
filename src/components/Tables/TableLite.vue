<template>
    
    <div class="px-4">
     
    <div class="sm:flex sm:items-center">
       <!-- headers -->
      <div class="sm:flex-auto">
        <slot name="header">
            <button @click="randomizeColumns" class="text-xs p-1 border rounded">Randomize Columns</button>
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
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
           <div id="scrollable" :class="container_classes">
              <!-- table -->
              <table class="min-w-full table-fixed divide-y divide-gray-300 border-2 border-separate border-spacing-0 border-transparent">
                <!-- table header -->
                <thead class="sticky top-0" :class="head_classes">
                  <template :key="header_group.id" v-for="header_group in tableInstance.getHeaderGroups()">
                      <tr class="py-0">
                          <template :key="header.accessorKey" v-for="(header, index) in header_group.headers">
                              <th :colspan="header.colSpan" scope="col" class="group text-left" :class="header_cell_classes">

                                  <div class="flex items-center relative group">

                                      <div :class="[
                                          index === 0 ? 'group-hover:ml-6' : '',
                                          'transition-all duration-500'
                                      ]">
                                          <slot :name="'header_'+header.accessorKey" v-bind:header="header">
                                              <FlexRender
                                                :render="header.column.columnDef.header"
                                                :props="header.getContext()"
                                              />
                                          </slot>
                                      </div>
                                  </div>
                              </th>
                          </template>

                      </tr>
                  </template>
                </thead>
               <!-- table body -->
               <tbody class="divide-y divide-gray-200 dark:divide-slate-600 bg-white dark:bg-churpy-dark/60 h-9 overflow-auto">

                    <!-- table row(s) -->
                    <template v-if="!loading && data.length > 0" v-for="row in tableInstance.getRowModel().rows" :key="row.id">

                      <tr class="transition-all" :class="[row_classes]">
                          <!-- row data -->
                            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="whitespace-nowrap" :class="cell_classes">
                              <slot :name="cell.id" v-bind:record="row">
                                  <FlexRender
                                    :render="cell.column.columnDef.cell"
                                    :props="cell.getContext()"
                                  />
                              </slot>
                            </td>
                        </tr>

                        <slot name="inner_table" v-bind:record="record"></slot>
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
                </div>
            </div>
          </div>



        <Paginator :instance="tableInstance" v-if="!removePagination"
                   :initialPageSize="initialPageSize"
                   :records="records"
                   :totalRecords="totalRecords || records.length"
                   @paginate-records="paginationUpdate" />

        </div>
  </div>

<TableSettings
        @reOrderColumns="reOrderColumns"
        @close="open_settings = false"
        :columns="tableInstance.getAllLeafColumns()"
        :open="open_settings" />

<!--  For testing only -->
 <div class="h-[600px] w-full border px-20">
    <span class="text-slate-500 text-sm">Test stuff here</span>
    <div class="mt-5">
        Table props
    </div>
</div>

</template>

<script lang="ts">
import {toRef, ref} from "vue";
import Empty from "../elements/Empty.vue";
import Paginator from "./Pagination/Paginator.vue";
import {
    PaginationState, getPaginationRowModel,
    getCoreRowModel,
    FlexRender,
    useVueTable,
    orderColumns,
} from "@tanstack/vue-table";
import helpers from "../../library/helper_functions.js";
import TableSettings from "./TableSettings.vue";
import {columns} from "../../library/data";

export default {
  name: "TableLite",
    methods: {
        columns() {
            return columns
        }
    },
  components: {TableSettings, Paginator, Empty, FlexRender},
  props:{
    loading:{default:false},
    settings: Boolean,
    removePagination: Boolean,
    selectable:{default:false, type:Boolean},
    headers:{required:true, type:Array},
    actioned:{default:false, type:Boolean},
    url:{default:''},
    records:{
      type:Array,
      default:[]
    },
    totalRecords: {type: Number},
    initialPageSize: {type:Number},
     container_classes: {type:String, default: 'ring-1 ring-black ring-opacity-5 md:rounded max-h-[65vh] overflow-y-auto border dark:border-slate-500 rounded'},
     head_classes: {type:String, default: 'bg-gray-200 z-10 dark:bg-churpy-dark whitespace-nowrap'},
     header_cell_classes: {type:String, default: 'px-2 min-w-2 py-3 text-xs font-semibold text-churpy-dark dark:text-gray-400'},
     row_classes: {type:String, default: 'dark:hover:bg-gray-300/20 hover:bg-gray-100/60 dark:odd:bg-gray-600 odd:bg-gray-100'},
     cell_classes: {type:String, default: 'px-3 py-1 text-xs text-gray-500 dark:text-gray-300'},
  },
  setup(props, { emit }){
      const {makeTitle} = helpers

    let data = toRef(props,"records");
    let startIndex = ref(0);
    let endIndex = ref(3000);
    let open_settings = ref(false);

    let columns = props.headers.map((header) => {
        return {
          header: header.label || makeTitle(header.key, '_'),
          accessorKey: header.key,
        }
      })

    const tableInstance = useVueTable({
      data: props.records,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }, orderColumns); // our tanstack table instance



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

    function toggleSettingView(){open_settings.value = !open_settings.value}

  const reOrderColumns = (columns) => {
      tableInstance.setColumnOrder(
        columns.map(d => d.id)
      )
    }

    return {
        tableInstance,reOrderColumns,

        makeTitle, open_settings, toggleSettingView,
        data, paginationUpdate,
        startIndex, endIndex,
    }

  }

}
</script>

<style scoped>

</style>
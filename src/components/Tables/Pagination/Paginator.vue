<script>
import { ref, computed } from "vue";
import {usePagination} from "./usePagination.js";
export default {
  name: "Paginator",
  props: {
    instance: { type: Object, required: true},
    totalRecords: { type: Number, default: 0 },
    initialPageSize: {type: Number, default:0}
  },
  setup(props, { emit }) {
    const pageSize = ref(props.instance.getState().pagination.pageSize);

    if (props.initialPageSize > 0){
        props.instance.setPageSize(Number(props.initialPageSize))
    }

      const {pages, pageSizeOptions} = usePagination({
          totalRecords: props.totalRecords,
          totalPages: props.instance.getPageCount(),
          maxButtons: 5,
          currentPage: props.instance.getState().pagination.pageIndex + 1,
      })

    const handlePageSizeChange = (e) => {
      const val = e.target.value;
      if(val) props.instance.setPageSize(Number(val))
       emit('paginateRecords', {
        currentPage: props.instance.getState().pagination.pageIndex + 1,
        pageSize: props.instance.getState().pagination.pageSize
       })
    }

    const handleSelectPage = (item) => {
        props.instance.setPageIndex(item-1)
      emit('paginateRecords', {
        currentPage: props.instance.getState().pagination.pageIndex + 1,
        pageSize: props.instance.getState().pagination.pageSize
       })
    }


    return {
      pageSize, handlePageSizeChange,
      handleSelectPage, pages,
      pageSizeOptions
    };
    
  },
}
</script>
<template>
  <div class="flex gap-3 justify-between m-3 items-center flex-wrap">
    <p class="text-xs">Page <b>{{ instance.getState().pagination.pageIndex + 1 }} of {{ instance.getPageCount() }}</b> <span><small>({{ totalRecords }} total records)</small></span></p>
    <div class="flex justify-between items-center gap-2 flex-wrap">
      <select v-model="pageSize" @input="handlePageSizeChange" class="rounded leading-none border-gray-300 text-xs focus:outline-none focus:ring-green-500 focus:border-green-500 mr-3 py-1.5 dark:bg-churpy-night dark:border-gray-500">
        <option value="">---Page Size---</option>
        <option v-for="(item, idx) in pageSizeOptions" :key="idx" :value="item">{{ item}}</option>
      </select>
      <div class="flex flex-wrap">
        <button class="capitalize relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 bg-white dark:bg-churpy-night dark:border-gray-500 text-xs font-medium text-gray-500 hover:bg-gray-50" @click="instance.previousPage()" :disabled="!instance.getCanPreviousPage()">prev</button>
      <button  v-for="item in pages"
        :key="item"
        :disabled="(instance.getState().pagination.pageIndex + 1) === item || item === '...'"
        @click="handleSelectPage(item)"
        :class="[
            (instance.getState().pagination.pageIndex + 1) === item ? 'z-10 bg-green-50 dark:bg-green-500 dark:text-white border-green-500 text-green-600' : 'bg-white border-gray-300 dark:bg-churpy-night dark:border-gray-500 dark:text-gray-300 text-gray-500 hover:bg-gray-50'
        ]"
        aria-current="page"
        class="relative transition-all inline-flex items-center px-4 border text-xs py-1.5 font-medium">  {{ item }} </button>
          <button class="capitalize relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 bg-white dark:bg-churpy-night dark:border-gray-500 text-xs font-medium text-gray-500 hover:bg-gray-50" @click="instance.nextPage()" :disabled="!instance.getCanNextPage()">next</button>
      </div>
    </div>
  </div>
</template>

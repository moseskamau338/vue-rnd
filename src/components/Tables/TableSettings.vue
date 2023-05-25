<template>
<TransitionRoot as="template" :show="open">
    <div class="z-[12] fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div @click="$emit('close')" class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-150" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col divide-y divide-gray-200 bg-white dark:bg-churpy-night-box shadow-xl">
                <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 class="text-lg font-medium"> Table Settings </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="group flex justify-center items-center rounded-full h-8 w-8 bg-slate-200 dark:bg-churpy-night focus:ring-green-500 focus:border-green-500" @click="$emit('close')">
                          <span class="sr-only">Close panel</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="group-hover:text-slate-500 text-slate-400 w-6 h-6 transition-all">
                              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                            </svg>

                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="border p-4 rounded dark:border-slate-500">
                      <h3 class="font-bold text-sm text-slate-500">Show/hide columns</h3>

                      <fieldset class="space-y-5 ml-4 mt-1 max-h-[300px] overflow-y-auto">
                        <legend class="sr-only">columns</legend>
                          <draggable :list="columns" tag="ul" @end="onDragEnd">
                              <template :key="column" #item="{ element: column }">
                                 <li  class="relative flex items-start group py-1 bg-white">
                                     <div class="absolute right-4 flex space-x-2 items-center">
                                        <span
                                              class="opacity-40 hover:cursor-move px-1 py-0.5 hover:bg-slate-300/50 rounded flex-col -space-y-1 leading-none text-[10px] transition-all duration-500 hidden group-hover:flex">
                                              <span>&bull;&bull;&bull;</span>
                                              <span>&bull;&bull;&bull;</span>
                                          </span>

                                         <div class="flex space-x-1" title="Pin column">
                                             <button @click="toggleColumnPinning(column, 'left')">
                                               <SvgIcons
                                                       :class="[
                                                           column.getIsPinned() === 'left' ? 'flex fill-slate-600' : 'hidden group-hover:flex fill-slate-300'
                                                       ]"
                                                       class="h-3 transition-all duration-500 hover:fill-slate-600"  name="pin-column-left" />
                                             </button>
                                             <button @click="toggleColumnPinning(column, 'right')">
                                               <SvgIcons
                                                       :class="[
                                                           column.getIsPinned() === 'right' ? 'flex fill-slate-600' : 'hidden group-hover:flex fill-slate-300'
                                                       ]"
                                                       class="h-3 transition-all duration-500 hover:fill-slate-600" name="pin-column-right" />
                                             </button>
                                         </div>

                                     </div>
                                      <div :class="{
                                        'pointer-events-none opacity-40' : column['always_show']
                                      }" class="flex items-center h-5">
                                        <input :value="column.getIsVisible()" :checked="column.getIsVisible()" @change="toggleColumnVisibility($event, column)" type="checkbox" class="dark:bg-slate-800 dark:border-gray-500 focus:ring-0 h-4 w-4 checked:text-green-600 rounded-sm" />
                                      </div>
                                      <div class="ml-3 text-sm">
                                        <label class="text-slate-500 dark:text-slate-600">
                                            {{ column.id === 'select' ? 'Selection' : column.columnDef.header }}
                                        </label>
                                      </div>
                                 </li>
                              </template>
                            </draggable>

                      </fieldset>
                    </div>

                    <div class="mt-8">
                      <h3>Other Configurations</h3>
                      <label for="default-toggle" class="pointer-events-none opacity-40 inline-flex relative items-center mb-4 cursor-pointer mt-5">
                        <input type="checkbox" value="" id="default-toggle" class="sr-only peer">
                        <div class="w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-green-500 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-green-100 after:content-[''] after:absolute after:top-0 after:left-[1px] after:bg-slate-500 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        <span class="ml-3 text-sm text-slate-500">View Column Search</span>
                      </label>
                    </div>
                    <!-- /End replace -->
                  </div>
                </div>
                <div class="flex space-x-5 flex-shrink-0 justify-end px-4 py-4">
                  <button @click="$emit('close')" class="p-2 border rounded">Done</button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionChild, TransitionRoot } from '@headlessui/vue'
import helpers from "../../library/helper_functions.js";
import {ref, toRef, toRefs} from "vue";
import {useDraggable} from "@vueuse/core";
import draggable from 'vuedraggable';
import SvgIcons from "../elements/SvgIcons.vue";


const col_row_el = ref<HTMLElement | null>(null)
const col_row_handle = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(col_row_el, {
  initialValue: { x: 40, y: 40 },
    handle: col_row_handle
})

const props = defineProps({
    open: {default: false},
    columns: {required: true, type: Array}
  })
const emits = defineEmits(['reOrderColumns', 'pinColumn'])

const toggleColumnVisibility = (e, column) => {
    //console.log('Toggling: ', e.target.checked, column)
    column.toggleVisibility(e.target.checked)
}


const {makeTitle} = helpers

const onDragEnd = (e) => {
    emits('reOrderColumns', props.columns)
}
const toggleColumnPinning = (column, side) => {
    emits('pinColumn', {column, side})
}

</script>

<style scoped>

</style>
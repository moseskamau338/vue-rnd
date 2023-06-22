<template>
  <div
    :id="data.id"
    :gs-id="data.id"
    :gs-x="data.grid.x"
    :gs-y="data.grid.y"
    :gs-w="data.grid.w"
    :gs-h="data.grid.h"
    class="w-fit relative"
  >
      <div id="panel" class="group grid-stack-item-content bg-white dark:bg-slate-800  dark:text-slate-300 rounded-md transition-all duration-300 scrollbar-hide" :class="{'shadow-sm' : !isEditing, 'cursor-move': isEditing }">
          <header class="sticky top-0 bg-slate-200 dark:bg-slate-700 flex justify-between py-1 px-3 rounded-t-md text-slate-500 dark:text-slate-300">
              <div class="flex items-center space-x-2">
                <span v-if="isEditing" ref="handle"
                      class="opacity-40 hover:cursor-move px-1 py-0.5 hover:bg-slate-300/50 rounded transition-all flex flex-col -space-y-1 leading-none text-xs">
                    <span>&bull;&bull;&bull;</span>
                    <span>&bull;&bull;&bull;</span>
                </span>
                <h2 class="font-medium text-sm">{{ makeTitle(data.title) }}</h2>
              </div>
              <div class="flex space-x-2 items-center">
                <button>
                    <ToolTip content="Panel description goes here">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                        </svg>
                    </ToolTip>

                </button>
                  <Menu :options="[
                      {label:'Hello', action: () => {}, classes:''},
                      {label:'Delete', action: deleteWidget, classes:'bg-red-100 dark:hover:bg-red-100/40 text-red-700 dark:hover:text-red-200 transition-all duration-300'},
                  ]">
                      <template #button>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                          </svg>
                      </template>
                  </Menu>
            </div>
        </header>
          <div class="h-full overflow-y-scroll scrollbar-thin">
              <Component v-if="data.instance" :is="data.instance.component" :key="data.id" v-bind:instance="data.instance" />
              <div v-else></div>
          </div>
      </div>
  </div>
</template>
<script setup>

import ToolTip from "@/components/elements/ToolTip.vue";
import Menu from "@/components/elements/Menu.vue";
import helper_functions from "@/library/helper_functions.js";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isEditing: Boolean,
});

const emit = defineEmits(["delete"]);
const {makeTitle} = helper_functions
function deleteWidget() {
  emit("delete", props.data);
}
</script>

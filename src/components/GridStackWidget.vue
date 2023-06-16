<template>
  <div
    :id="data.id"
    :gs-id="data.id"
    :gs-x="data.grid.x"
    :gs-y="data.grid.y"
    :gs-w="data.grid.w"
    :gs-h="data.grid.h"
  >
      <div id="panel" class="relative group grid-stack-item-content bg-white rounded-md transition-all duration-300" :class="{'shadow-sm' : !isEditing, 'cursor-move': isEditing }">
          <div>
              <div>
                  <header id="panel_handle" class="bg-slate-200 flex justify-between py-1 px-3 rounded-t-md text-slate-500">
                      <div class="flex items-center space-x-2">
                        <span v-if="isEditing" ref="handle"
                              class="opacity-40 hover:cursor-move px-1 py-0.5 hover:bg-slate-300/50 rounded transition-all flex flex-col -space-y-1 leading-none text-xs">
                            <span>&bull;&bull;&bull;</span>
                            <span>&bull;&bull;&bull;</span>
                        </span>
                        <h2 class="font-medium text-sm">A panel title here</h2>
                      </div>
                      <div class="flex space-x-2 items-center">
                      <span>
                          <ToolTip content="Panel description goes here">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                              </svg>
                          </ToolTip>

                      </span>
                      <span>
                          <Menu :options="[
                              {label:'Hello', action: () => {}, classes:''},
                              {label:'Delete', action: deleteWidget, classes:'bg-red-100 text-red-700'},
                          ]">
                              <template #button>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                                  </svg>
                              </template>
                          </Menu>
                      </span>
                    </div>
                </header>
                  <div>
                      {{ data.title }}
                  </div>
              </div>
          </div>
      </div>
<!--    <div-->
<!--      class="grid-stack-item-content group relative p-4 bg-white rounded-sm shadow-sm flex items-center justify-center"-->
<!--      :class="{ 'cursor-move': isEditing }"-->
<!--    >-->
<!--      <span class="text-xl text-gray-700 w-full h-full">-->
<!--        {{ data.title }}-->
<!--      </span>-->
<!--      <button-->
<!--        v-if="isEditing"-->
<!--        class="hidden group-hover:block absolute top-2 right-2 text-slate-300"-->
<!--        @click="deleteWidget">-->
<!--          Delete-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>
<script setup>

import ToolTip from "@/components/elements/ToolTip.vue";
import Menu from "@/components/elements/Menu.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isEditing: Boolean,
});

const emit = defineEmits(["delete"]);
function deleteWidget() {
  emit("delete", props.data);
}
</script>

<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import CButton from "@/components/elements/CButton.vue";
import PanelWorkshop from "@/components/Panel/PanelWorkshop.vue";
import GridStackWidget from "@/components/GridStackWidget.vue";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import {nextTick, onMounted, ref} from "vue";

defineProps({
    page: {type: Object, required: true},
})

const dashboard_options = ref([
    {label: 'Edit Page', key:'', action: toggleEdit},
    {label: 'Update Variables', key:'', action:() => {}},
    {label: 'Delete Page', key:'', action:() => {}},
])
const is_editing = ref(false)
const show_panel_wizard = ref(false)
const grid = ref(null);
const widgets = ref([
  {
    id: 1,
    title: "Widget 1",
    grid: {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
  },
  {
    id: 2,
    title: "Widget 2",
    grid: {
      x: 2,
      y: 0,
      w: 2,
      h: 1,
    },
  },
  {
    id: 3,
    title: "Widget 3",
    grid: {
      x: 0,
      y: 2,
      w: 2,
      h: 1,
    },
  },
  {
    id: 4,
    title: "Widget 4",
    grid: {
      x: 2,
      y: 2,
      w: 3,
      h: 2,
    },
  },
  {
    id: 5,
    title: "Widget 5",
    grid: {
      x: 3,
      y: 2,
      w: 2,
      h: 2,
    },
  },
]);

function initGridStack() {
  grid.value = GridStack.init({
    column: 6,
    cellHeight: 100,
    margin: 8,
    disableResize: !is_editing.value,
    disableDrag: !is_editing.value,
  });
  makeWidgets(widgets.value);
}

function makeWidgets(widgets) {
  widgets.forEach((widget) => {
    makeWidget(widget);
  });
}
function makeWidget(item) {
  const elSelector = `#${item.id}`;
  return grid.value.makeWidget(elSelector);
}

async function addWidget() {
  const widgetCount = widgets.value.length + 1;
  const widget = {
    id: widgetCount,
    title: `Widget ${widgetCount}`,
    grid: {
      w: 3,
      h: 1,
    },
  };
  widgets.value.push(widget);
  await nextTick();
  console.log('Adding widget...', widget)
  makeWidget(widget);
}

function deleteWidget(widget) {
  const index = widgets.value.findIndex((w) => w.id === widget.id);
  if (index === -1) {
    return;
  }
  const selector = `#${CSS.escape(widget.id)}`;
  grid.value.removeWidget(selector);
  grid.value.compact();
  widgets.value.splice(index, 1);
}


function toggleEdit() {
  if (is_editing.value) {
    grid.value.disable();
  } else {
    grid.value.enable();
  }
  is_editing.value = !is_editing.value;
}

onMounted(() => {
  initGridStack();
});



</script>

<template>
    <header class="flex justify-between relative z-10">
        <div></div>
        <div class="space-x-5 flex items-center transition-all duration-300">
            <div class="flex items-center flex-row">
                <input type="date" class="focus:ring-green-500 focus:border-green-500 block sm:text-xs border-gray-300 rounded placeholder:text-xs" placeholder="Enter page name...">
                <span class="text-slate-400 text-xs px-3">to</span>
                <input type="date" class="focus:ring-green-500 focus:border-green-500 block sm:text-xs border-gray-300 rounded placeholder:text-xs" placeholder="Enter page name...">
            </div>
            <Menu as="div" className="relative flex">
              <!--inline-block text-left-->
                <button @click="show_panel_wizard = !show_panel_wizard" class="border border-gray-300 w-full justify-center rounded-l px-4 py-1.5 text-xs font-medium focus:outline-none hover:bg-slate-200 transition-all duration-300">+ Add Panel</button>
              <div>
                <MenuButton
                  class="border border-l-0 border-gray-300 inline-flex w-full justify-center rounded-r px-2 py-1.5 text-sm font-medium focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>

                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-8 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                      <template v-for="item in dashboard_options">
                        <MenuItem v-slot="{ active }">
                          <button
                            @click="item.action"
                            :class="[
                              active ? 'bg-gray-300/30' : '',
                              'group flex w-full items-center rounded px-2 py-2 text-xs',
                            ]"
                          >
                              {{ item.label }}
                          </button>
                        </MenuItem>
                      </template>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <div v-if="is_editing" class="flex space-x-2 transition-all duration-500">
                <CButton @click="toggleEdit" variant="success">Save</CButton>
                <CButton @click="toggleEdit" variant="secondary">Cancel</CButton>
            </div>
        </div>
    </header>
  <div :class="{'graph-paper border' : is_editing}"
       class="min-h-[700px] w-full mt-8 transition-all duration-300 relative">
        <div class="py-2 px-2.5 flex justify-end space-x-2">
          <CButton variant="secondary" v-if="is_editing" @click="addWidget">Add Widget</CButton>
        </div>
        <div class="grid-stack">
          <GridStackWidget
            v-for="widget in widgets"
            :key="widget.id"
            :data="widget"
            :is-editing="is_editing"
            @delete="deleteWidget"
          />
        </div>

  </div>

  <PanelWorkshop :open="show_panel_wizard" @close="show_panel_wizard = false"/>

</template>

<style>

</style>

<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import CButton from "@/components/elements/CButton.vue";
import PanelWorkshop from "@/components/Panel/PanelWorkshop.vue";
import GridStackWidget from "@/components/GridStackWidget.vue";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import {onMounted, ref} from "vue";
import {usePanelStore} from '@/stores/panels'
import Empty from "@/components/elements/Empty.vue";

defineProps({
    page: {type: Object, required: true},
})

const panelStore = usePanelStore()

const dashboard_options = ref([
    {label: 'Edit Page', key:'', action: panelStore.toggleEdit},
    {label: 'Update Variables', key:'', action:() => {}},
    {label: 'Delete Page', key:'', action:() => {}},
])

const is_mounted = ref(false)

onMounted(() => {
  panelStore.initGridStack(GridStack);
  is_mounted.value = true
});



</script>

<template>
   <teleport v-if="is_mounted" to="#panel-dashboard-header">
       <div class="space-x-5 flex items-center transition-all duration-300">
            <div class="flex items-center flex-row">
                <input type="date" class="focus:ring-green-500 focus:border-green-500 block sm:text-xs border-gray-300 rounded placeholder:text-xs dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100" placeholder="Enter page name...">
                <span class="text-slate-400 text-xs px-3">to</span>
                <input type="date" class="focus:ring-green-500 focus:border-green-500 block sm:text-xs border-gray-300 rounded placeholder:text-xs dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100" placeholder="Enter page name...">
            </div>
            <Menu as="div" className="relative flex">
              <!--inline-block text-left-->
                <button @click="panelStore.show_panel_wizard = !panelStore.show_panel_wizard" class="border border-gray-300 w-full justify-center rounded-l px-4 py-1.5 text-xs font-medium focus:outline-none hover:bg-slate-200 transition-all duration-300 dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100">+ Add Panel</button>
              <div>
                <MenuButton
                  class="border border-l-0 border-gray-300 inline-flex w-full justify-center rounded-r px-2 py-1.5 text-sm font-medium focus:outline-none dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100"
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
                  class="absolute right-0 mt-8 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white dark:bg-brand-night-box dark:text-slate-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                      <template v-for="item in dashboard_options">
                        <MenuItem v-slot="{ active }">
                          <button
                            @click="item.action"
                            :class="[
                              active ? 'bg-gray-300/30 dark:bg-slate-700' : '',
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

            <div v-if="panelStore.is_editing" class="flex space-x-2 transition-all duration-500">
                <CButton @click="panelStore.toggleEdit($event, true)" variant="success">Save</CButton>
                <CButton @click="panelStore.toggleEdit" variant="secondary">Cancel</CButton>
            </div>
       </div>

   </teleport>
  <div :class="{'graph-paper border dark:border-slate-700' : panelStore.is_editing}"
       class="min-h-[700px] w-full mt-8 transition-all duration-300 relative">
        <div class="grid-stack">
            <template v-if="panelStore.activePage.widgets.length > 0">
                <GridStackWidget
                  v-for="widget in panelStore.activePage.widgets"
                  :key="widget.id"
                  :data="widget"
                  :is-editing="panelStore.is_editing"
                  @delete="panelStore.deleteWidget"
                />
            </template>
            <template v-else>
                <Empty title="No panels available">
                    <template #description>
                        <div class="text-center text-xs w-[400px] mt-2">
                            <p class="text-slate-400">
                                Panels are analytics widgets that you create for the purpose of visualizing different pieces of your data.
                            </p>
                            <CButton
                                @click="panelStore.show_panel_wizard = !panelStore.show_panel_wizard"
                                variant="secondary"
                                class="mt-4">+ Add Panel</CButton>
                        </div>
                    </template>
                </Empty>
            </template>
        </div>

  </div>

  <PanelWorkshop :open="panelStore.show_panel_wizard" @close="panelStore.show_panel_wizard = false"/>

</template>

<style>

</style>

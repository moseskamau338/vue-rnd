<template>
<section class="">
   <div class="rounded grid grid-cols-12 gap-4">
       <div class="col-span-3 p-2 border-r">
           <CustomSelect v-model="selectedItem" :options="options" label="name" placeholder="Choose visualization">
               <template #selected-items="{selected}">
                   <div class="flex space-x-2 items-center p-1">
                       <div class="h-5 w-5 flex justify-center items-center shrink-0 grow-0 rounded-full border border-green-400 shadow overflow-clip">
                          <img :src="selectedItem.image" alt="option.name" class="object-cover object-center">
                        </div>
                        <span>{{ selectedItem.label }}</span>
                    </div>
               </template>
                <template #option="{option, status}">
                    <div :class="[
                                status.active ? 'bg-gray-200' : ''
                            ]" class="flex justify-between items-center py-3 px-2 cursor-pointer transition-all duration-300">
                        <div class="flex space-x-2">
                            <div class="h-5 w-5 flex justify-center items-center shrink-0 grow-0 rounded-full border border-green-400 shadow overflow-clip">
                              <img :src="option.image" alt="option.name" class="object-cover object-center">
                            </div>
                            <span>{{ option.label }}</span>
                        </div>
                        <span v-if="status.selected">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 stroke-green-600">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>

                        </span>
                    </div>
                </template>
           </CustomSelect>
          <PanelOptions :panel="panel_instance" />
       </div>
       <div class="col-span-9 h-[60vh] overflow-y-scroll">
           <TabGroup >
               <div class="flex justify-end pr-10">
                  <TabList class="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-reverse items-center mt-3">
                    <div class="flex p-1 space-x-1 dark:bg-brand-dark bg-gray-200 rounded-lg max-w-fit">

                        <!--Add Analytics-->
                        <Tab
                          v-for="category in ['Visual', 'Data']"
                          as="template"
                          v-slot="{ selected }"
                        >
                          <button
                            :class="[
                              'w-fit px-4 py-1 text-xs font-medium rounded',
                              'focus:outline-none focus:ring-0 ring-opacity-60 transition-all duration-800 ease-out',
                              selected
                                ? 'bg-white text-slate-600 dark:text-slate-700 shadow'
                                : 'text-slate-800 dark:text-gray-600',
                            ]"
                          >
                            {{ category }}
                          </button>
                        </Tab>
                    </div>
                  </TabList>
               </div>

              <TabPanels class="mt-2 bg-transparent">
                <!--<TabPanel class="h-full p-3">-->
                <!--  <div>Prompt API: {}</div>-->
                <!--</TabPanel>-->
                <TabPanel class="h-full p-3">
                    <Visualizer :widget="panel_instance" />
                </TabPanel>
                <TabPanel class="h-full p-3">
                    <DataView />
                </TabPanel>
              </TabPanels>
           </TabGroup>

       </div>
   </div>
</section>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import {ref, watch} from "vue";
import CustomSelect from "../CustomSelect.vue";
import PanelOptions from "./PanelOptions.vue";
import Visualizer from "./Visualizer.vue";
import DataView from "./DataView.vue";
import {usePanelStore} from "@/stores/panels.js";

export default {
    name: "PanelEditor",
    components: {
        DataView, Visualizer, PanelOptions,
        CustomSelect, TabGroup, TabList, Tab,
        TabPanels, TabPanel
    },
    setup(){
        const panelStore = usePanelStore()
        const options = ref(Object.keys(panelStore.panels).map((panel) => {
            return panelStore.panels[panel]
        }))
        const selectedItem = ref(options.value[0])

        //always setup class
        let panel_instance = ref(new selectedItem.value.itemClass())

        watch(selectedItem, () => {
            panel_instance.value = new selectedItem.value.itemClass()
        })

        return {options, selectedItem, panel_instance}
    }
}
</script>

<style scoped>

</style>

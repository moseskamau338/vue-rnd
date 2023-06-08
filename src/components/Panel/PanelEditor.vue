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
                        <span>{{ selectedItem.name }}</span>
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
                            <span>{{ option.name }}</span>
                        </div>
                        <span v-if="status.selected">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 stroke-green-600">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>

                        </span>
                    </div>
                </template>
           </CustomSelect>
          <PanelOptions :panel-id="selectedItem.id" />
       </div>
       <div class="col-span-9 grid grid-rows-2 gap-4 h-[60vh] overflow-y-scroll">
           <Visualizer :widget="selectedItem" class="row-span-1" />

           <div class="row-span-1">
             <DataView />
           </div>
       </div>
   </div>
</section>
</template>

<script>
import {ref} from "vue";
import CustomSelect from "../CustomSelect.vue";
import PanelOptions from "./PanelOptions.vue";
import Visualizer from "./Visualizer.vue";
import DataView from "./DataView.vue";
import {usePanelStore} from "@/stores/panels.js";

export default {
    name: "PanelEditor",
    components: {DataView, Visualizer, PanelOptions, CustomSelect},
    setup(){
        const panelStore = usePanelStore()
        const options = ref(Object.keys(panelStore.panels).map((panel) => {
            return panelStore.panels[panel].options
        }))
        const selectedItem = ref(options.value[0])

        return {options, selectedItem}
    }
}
</script>

<style scoped>

</style>

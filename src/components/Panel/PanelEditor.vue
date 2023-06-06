<template>
<section class="">
   <div class="rounded grid grid-cols-12 gap-4">
       <div class="col-span-3 p-2 border-r">
           <CustomSelect v-model="selectedItem" :options="options" label="name" placeholder="Choose visualization">
               <template #selected-items="{selected}">
                   <div class="flex space-x-2 items-center p-1">
                        <div class="h-5 w-5 flex justify-center items-center shrink-0 grow-0 rounded-full border border-green-400 shadow bg-cover bg-center"
                             :style="`{background-image: url(${selectedItem.image})}`">
                        </div>
                        <span>{{ selectedItem.name }}</span>
                    </div>
               </template>
                <template #option="{option, status}">
                    <div class="flex space-x-2 items-center py-3 px-2">
                        <div class="h-8 w-8 flex justify-center items-center shrink-0 grow-0 rounded-full border border-green-400 p-2 shadow">
                          <img :src="option.image" alt="option.name">
                        </div>
                        <span>{{ option.name }}</span>
                    </div>
                </template>
           </CustomSelect>
          <PanelOptions />
       </div>
       <div class="col-span-9 grid grid-rows-6 gap-4">
           <Visualizer class="row-span-1" />

           <div class="row-span-1 overflow-y-scroll">
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

export default {
    name: "PanelEditor",
    components: {DataView, Visualizer, PanelOptions, CustomSelect},
    setup(){
        const options = ref([
        {name: 'Table View', image:'/images/table.png', description:'', categories:['Table','all']},
        {name: 'Pie Chart', image:'/images/pie.png', description:'', categories:['Correlation', 'Distribution', 'all']},
        {name: 'Bar Chart', image:'/images/bar.png', description:'', categories:['Correlation', 'Distribution', 'all']},
        {name: 'Line Chart', image:'/images/line.png', description:'', categories:['Correlation', 'Distribution', 'all']},
        {name: 'Area Chart', image:'/images/area.png', description:'', categories:['Correlation', 'Distribution', 'all']},
        {name: 'Mixed Chart', image:'/images/mixed.png', description:'', categories:['Correlation', 'Distribution', 'all']},
        {name: 'Label', image:'/images/table.png', description:'', categories:['Label', 'all']},
        {name: 'Dynamic Label (Big Number, Dynamic Text)', image:'/images/number.png', description:'', categories:['Metrics/KPI', 'all']},
        {name: 'Number Trend Line', image:'/images/trendline.png', description:'', categories:['Metrics/KPI','Correlation', 'Distribution', 'all']},
      ])
        const selectedItem = ref(options.value[0])

        return {options, selectedItem}
    }
}
</script>

<style scoped>

</style>

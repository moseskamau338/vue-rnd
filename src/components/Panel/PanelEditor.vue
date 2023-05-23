<template>
<section class="p-10 bg-slate-100">
   <div class="bg-white shadow-md rounded grid grid-cols-12 gap-4 h-[80vh]">
       <div class="col-span-3 p-2 border-r">
          <CustomSelect v-model="selectedItem" :options="options" label="name" />
          <PanelOptions />
       </div>
       <div class="col-span-9 grid grid-rows-6 gap-4">
           <Visualizer class="row-span-4" />

           <DataView class="row-span-2" />
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
        const selectedItem = ref(null)
        const options = [
        { name: 'Unga' },
        { name: 'Buyer 123' },
        { name: 'Buyer 4' },
        { name: 'Buyer 6' },
        { name: 'Buyer 5367' },
        { name: 'Buyer 9087635' },
      ]
        return {options, selectedItem}
    }
}
</script>

<style scoped>

</style>

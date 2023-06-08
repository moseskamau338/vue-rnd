<script setup>
  import CustomSelect from "@/components/CustomSelect.vue";
  import {ref} from "vue";
  import color_schemes from "@/components/Panel/color_schemes.js";
  import helper_functions from "@/library/helper_functions.js";

  const props = defineProps({
      styles: {type: Object, required: true},
  })

  const selected_color_scheme = ref('')
  const label_colors =ref({
      light:'#000000',
      dark:'#b6bac2',
  })
  const {makeTitle} = helper_functions
</script>

<template>
 <div>
     <form action="#">
      <!--db inputs-->
          <label for="dataset" class="text-slate-400 text-xs">Colors</label>
          <div class="mt-2 relative">
            <label for="color_schemes" class="block text-xs font-medium text-gray-700">Color Schemes</label>
            <CustomSelect
                    placeholder="Choose color scheme"
                    :options="Object.keys(color_schemes)"
                    v-model="selected_color_scheme">
                <template #selected-items>
                    <div class="relative flex justify-between items-center">
                          <span class="text-[10px] font-medium">{{makeTitle(selected_color_scheme, '_')}}</span>
                          <div class="flex w-[100px]">
                              <span v-for="color in color_schemes[selected_color_scheme]"  class="h-3 w-3 shrink-0 grow-0" :style="`background-color: #${color}`"></span>
                          </div>
                     </div>
                </template>
                    <template #option="{option}">
                       <div class="relative flex justify-between items-center p-1 cursor-pointer hover:bg-slate-100">
                            <span class="text-[10px] font-medium">{{makeTitle(option, '_')}}</span>
                            <div class="flex w-[100px]">
                                <span v-for="color in color_schemes[option]"  class="h-3 w-3 shrink-0 grow-0" :style="`background-color: #${color}`"></span>
                            </div>
                       </div>
                    </template>
            </CustomSelect>
          </div>

          <div class="mt-4">
            <label for="field" class="block text-xs font-medium text-gray-700">Label Colors</label>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-12 mt-2">
                <div class="col-span-6">
                    <div class="flex items-center space-x-2 border p-1 rounded">
                        <div class="relative h-5 w-5 rounded-full overflow-clip shrink-0 grow-0">
                            <div :style="`background-color: ${label_colors.light || 'white'}`" class="absolute pointer-events-none inset-0"></div>
                          <input type="color" v-model="label_colors.light" class="cursor-pointer">
                        </div>
                        <div>
                          <input type="text" class="text-xs border-none bg-red-600 w-full bg-transparent p-0 focus:outline-0 focus:border-none focus:ring-0" v-model="label_colors.light" />
                        </div>
                    </div>
                    <small class="text-slate-400 text-[10px]">Light mode</small>
                </div>
                <div class="col-span-6">
                    <div class="flex items-center space-x-2 border p-1 rounded">
                        <div class="relative h-5 w-5 rounded-full overflow-clip shrink-0 grow-0">
                              <div :style="`background-color: ${label_colors.dark || 'white'}`" class="absolute pointer-events-none inset-0 z-10"></div>
                          <input type="color" v-model="label_colors.dark" class="cursor-pointer">
                        </div>
                        <div>
                          <input type="text" class="text-xs border-none bg-red-600 w-full bg-transparent p-0 focus:outline-0 focus:border-none focus:ring-0" v-model="label_colors.dark" />
                        </div>
                    </div>
                    <small class="text-slate-400 text-[10px]">Dark mode</small>
                </div>
            </div>
          </div>

         <label for="dataset" class="text-slate-400 text-xs mt-4">Sizes</label>
         <div>
             <div class="mt-2 w-[250px]">
                <label for="color_schemes" class="block text-xs font-medium text-gray-700">Label Font Size</label>
                 <div class="flex items-center space-x-2">
                     <input type="range" min="5" max="300" class="w-full">
                     <input type="number" min="5" max="300" class="w-20 p-1 text-[9px] rounded border-slate-300 leading-none focus:ring-green-500 focus:border-green-500" placeholder="5">
                 </div>
             </div>

             <div class="mt-2 w-[250px]">
                <label for="color_schemes" class="block text-xs font-medium text-gray-700">Pie Chart Radius</label>
                 <div class="flex items-center space-x-2">
                     <input type="range" min="5" max="300" class="w-full">
                     <input type="number" min="5" max="300" class="w-20 p-1 text-[9px] rounded border-slate-300 leading-none focus:ring-green-500 focus:border-green-500" placeholder="5">
                 </div>
             </div>
         </div>
      <!--others-->
      </form>
 </div>
</template>

<style scoped>
/*Chrome*/
@media screen and (-webkit-min-device-pixel-ratio:0) {
    input[type='range'] {
      overflow: hidden;
      width: 100%;
        border-radius: 5px;
      -webkit-appearance: none;
      background-color: #d7d7d7;
    }

    input[type='range']::-webkit-slider-runnable-track {
      height: 10px;
      -webkit-appearance: none;
      color: #2fc742;
      margin-top: -1px;
    }

    input[type='range']::-webkit-slider-thumb {
      width: 10px;
      -webkit-appearance: none;
      height: 10px;
      cursor: ew-resize;
      border-radius: 50%;
      border: 5px;
      background: #ffffff;
      box-shadow: -80px 0 0 80px #2fc742;
    }

}
/** FF*/
input[type="range"]::-moz-range-progress {
  background-color: #2fc742;
}
input[type="range"]::-moz-range-track {
  background-color: #d7d7d7;
}
/* IE*/
input[type="range"]::-ms-fill-lower {
  background-color: #2fc742;
}
input[type="range"]::-ms-fill-upper {
  background-color: #d7d7d7;
}
</style>
<template>
<TabGroup >
  <TabList class="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-reverse items-center mt-3">
    <div class="flex p-1 space-x-1 dark:bg-brand-dark bg-gray-200 rounded-lg max-w-fit">

        <!--Add Analytics-->
        <Tab
          v-for="category in ['Options', 'Styles']"
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

  <TabPanels class="mt-2 bg-transparent">
    <!--<TabPanel class="h-full p-3">-->
    <!--  <div>Prompt API: {}</div>-->
    <!--</TabPanel>-->
    <TabPanel class="h-full p-3">
      <div>
         <QueryBuilder v-if="panel" :query-options="panel" />
          <Empty v-else description="No panel options found" title="" />
      </div>
    </TabPanel>
    <TabPanel class="h-full p-3">
        <div>
          <Styler v-if="panel" :styles="panel" />
          <Empty v-else description="No panel style options found selected" title="" />
        </div>
    </TabPanel>
  </TabPanels>

</TabGroup>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Empty from "@/components/elements/Empty.vue";
//import {usePanelStore} from "@/stores/panels.js";
import Styler from "@/components/Panel/Styler.vue";
import QueryBuilder from "@/components/Panel/QueryBuilder.vue";

export default {
name: "PanelOptions",
  components:{
      QueryBuilder,
      Styler,
    Empty,
    TabGroup, TabList, Tab, TabPanels, TabPanel
  },
  props:{
      panel:{type: Object, required: true}
  },
  setup(props){

  }
}
</script>

<style scoped>

</style>
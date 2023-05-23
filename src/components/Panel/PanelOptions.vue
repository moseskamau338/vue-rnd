<template>
<TabGroup >
  <TabList class="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-reverse items-center mt-3">
    <div class="flex p-1 space-x-1 dark:bg-churpy-dark bg-gray-200 rounded-lg max-w-fit">

        <!--Add Analytics-->
        <Tab
          v-for="category in ['Prompt','Options', 'Styles']"
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
      <TabPanel class="h-full p-3">
      <div>Prompt API: {}</div>
    </TabPanel>
    <TabPanel class="h-full p-3">
      <div>Options API: {}</div>
    </TabPanel>
    <TabPanel class="h-full p-3">
      <div>Styles API: {}</div>
    </TabPanel>
  </TabPanels>

</TabGroup>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

export default {
name: "PanelOptions",
components:{
TabGroup, TabList, Tab, TabPanels, TabPanel
},
}
</script>

<style scoped>

</style>
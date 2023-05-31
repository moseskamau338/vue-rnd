<script setup>
import {TabGroup, TabList, TabPanels, TabPanel, Tab} from "@headlessui/vue";
import {ref} from "vue";
import PanelArea from "./components/PanelArea.vue";

 const pages = ref([
      {type:'header', name:'Pages'},
      {type:'menu', name:'Accounts Metrics', disabled: false},
      {type:'menu', name:'Transactions Overview',disabled: false},
    ])

const newPageName = ref('')


const showAddPageInput = ref(false)

const vFocus = {
  mounted: (el) => el.focus()
}

const addPage = () => {
     if(newPageName.value.length <= 0) return;

     pages.value.push(
         {type:'menu', name: newPageName.value, disabled: false},
     )
    newPageName.value = ''
    showAddPageInput.value = false
}

</script>

<template>
<section class="mx-20 py-4 h-screen">
    <TabGroup as="section" class="grid gap-10 grid-cols-1 lg:grid-cols-12 mt-8" vertical>
        <TabList as="div" class="col-span-2 flex flex-col text-sm space-y-2 focus:outline-0">
          <template v-for="item in pages">
            <span v-if="item.type === 'header'" class="font-bold text-slate-400 pt-1">{{ item.name }}</span>
            <Tab :disabled="item.disabled" v-slot="{ selected }" v-else-if="item.type === 'menu'" class="focus:outline-0 w-full">
              <button :class="[
                  selected ? 'bg-white shadow' : '',
                  item.disabled ? 'opacity-70 pointer-events-none' : ''
                ]"
                 class="rounded text-left px-2 py-1.5 focus:border-none focus:ring-0 hover:bg-white w-full text-slate-500 focus:outline-0 transition-all duration-500 whitespace-nowrap truncate">
                <i class="fas mr-2" :class="item.icon"></i>
                  {{ item.name }}
              </button>
            </Tab>
          </template>

            <input v-focus autofocus v-if="showAddPageInput" @keyup.enter="addPage" v-model="newPageName" type="text" name="page" id="page" class="focus:ring-green-500 focus:border-green-500 block w-7/12 sm:text-sm border-gray-300 rounded placeholder:text-xs" placeholder="Enter page name...">


            <button v-if="!showAddPageInput" @click="showAddPageInput = true" class="border border-dashed border-slate-300 dark:border-slate-600 w-7/12 py-1.5 text-slate-400 dark:text-slate-700 hover:scale-105 transition-all duration-300 rounded">+ New Page</button>
        </TabList>

        <TabPanels class="col-span-10 focus:outline-0 h-screen">
            <template v-for="page in pages">
                  <TabPanel class="focus:outline-0">
                     <PanelArea :page="page" />
                  </TabPanel>
            </template>
        </TabPanels>
      </TabGroup>
</section>

</template>

<style>

</style>

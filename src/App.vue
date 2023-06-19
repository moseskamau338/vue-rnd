<script setup>
import {TabGroup, TabList, TabPanels, TabPanel, Tab} from "@headlessui/vue";
import {usePanelStore} from "@/stores/panels.js";
import PanelArea from "./components/PanelArea.vue";
import CButton from "@/components/elements/CButton.vue";

const panelStore = usePanelStore()

panelStore.activePage = panelStore.pages[1]

const vFocus = {
  mounted: (el) => el.focus()
}

</script>

<template>
<section class="mx-20 py-4 h-screen transition-all duration-300">
    <TabGroup as="section" class="grid gap-10 grid-cols-1 lg:grid-cols-12 mt-8" vertical>
        <TabList as="div" :class="[
            panelStore.showing_sidebar ? 'col-span-2 flex flex-col' : 'hidden'
        ]" class="col-span-2 text-sm space-y-2 focus:outline-0 transition-all duration-300">
          <template v-for="item in panelStore.pages">
            <span v-if="item.type === 'header'" class="font-bold text-slate-400 pl-2 pb-2">{{ item.name }}</span>
            <Tab :disabled="item.disabled" v-slot="{ selected }" v-else-if="item.type === 'menu'" class="focus:outline-0 w-full">
              <button @click="panelStore.activePage = item" :class="[
                  selected ? 'bg-white dark:bg-brand-night-box shadow' : '',
                  item.disabled ? 'opacity-70 pointer-events-none' : ''
                ]"
                 class="rounded text-left pr-2 py-1.5 focus:border-none focus:ring-0 dark:hover:bg-slate-700/50 hover:bg-white w-full text-slate-500 focus:outline-0 transition-all duration-500 whitespace-nowrap truncate">
                <i class="fas mr-2" :class="item.icon"></i>
                  {{ item.name }}
              </button>
            </Tab>
          </template>

            <input v-focus autofocus v-if="panelStore.showAddPageInput" @keyup.esc="panelStore.showAddPageInput = false" @keyup.enter="panelStore.addPage" v-model="panelStore.newPageName" type="text" name="page" id="page" class="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100 rounded placeholder:text-xs" placeholder="Enter page name...">


            <button v-if="!panelStore.showAddPageInput" @click="panelStore.showAddPageInput = true" class="border border-dashed border-slate-300 dark:border-slate-600 py-1.5 text-slate-400 dark:text-slate-700 hover:scale-105 transition-all duration-300 rounded w-full">+ New Page</button>
        </TabList>
        <TabPanels :class="[
            panelStore.showing_sidebar ? 'col-span-10' : 'col-span-12'
        ]" class="focus:outline-0 h-screen scrollbar-hide transition-all duration-300">
             <header class="flex justify-between relative z-10">
                <div>
                  <CButton @click="panelStore.showing_sidebar = !panelStore.showing_sidebar" variant="secondary">
                      <svg v-if="panelStore.showing_sidebar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                      </svg>

                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                      </svg>


                  </CButton>
                </div>
                <div id="panel-dashboard-header"></div>
            </header>
            <template v-for="page in panelStore.pages">
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

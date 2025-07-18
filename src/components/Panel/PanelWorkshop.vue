<script setup>
import Modal from "@/components/elements/Modal.vue";
import SvgIcons from "@/components/elements/SvgIcons.vue";
import CButton from "@/components/elements/CButton.vue";
import {usePanelStore} from "@/stores/panels.js";
import {computed, ref} from "vue";
import helper_functions from "@/library/helper_functions.js";
import {useWizard} from "@/library/wizard.js";
import PanelEditor from "@/components/Panel/PanelEditor.vue";

const {searchFilter} = helper_functions

defineProps({
    open: {required: true, type: Boolean}
})

const panelStore = usePanelStore()

const widgetQuery = ref('')
const selected_category = ref('all')
const categories = ref([
    'Table', 'Correlation', 'Distribution','Metrics/KPI',
])

const widgets = ref([
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

const filteredWidgets = computed(() => {
    let filtered = searchFilter(
        Object.entries(panelStore.panels).map(ent => ent[1]),
        widgetQuery.value
    )
    if (selected_category.value.length > 0){
        filtered = filtered.filter((widget) => {
            return widget.categories.includes(selected_category.value)
        })
    }
    return filtered
})


// ======== Wizard =========== \\
const detailsAreValid = computed(() => {
    let isValid = true
        Object.keys(panelStore.newPanel).forEach((detail_key) =>{
            if (typeof panelStore.newPanel[detail_key] === "string"){
                isValid = isValid && !!panelStore.newPanel[detail_key]
            }else if(typeof panelStore.newPanel[detail_key] === "object"){
                isValid = isValid && Object.keys(panelStore.newPanel[detail_key]).length > 0
            }
        })
    return isValid
})
const savePanelDetails = () => {
    return new Promise((resolve) => {
        // validation
        if (!detailsAreValid) return

        previousTabResult.value[activeComponent.value.outputKey] = panelStore.newPanel
        resolve(!!hasPreviousResult.value)
    })
}
let tabs = ref([
      {id:1, outputKey: 'panelDetails',status: 'active',name: 'Panel Details', icon:'fa-file-invoice',action:savePanelDetails},
      {id:2, outputKey: null,status: 'pending',name:'Widget Configuration', icon:'fa-check', action: addPanel}
    ])
let {next,jump,prev,activeComponent,processing, emitter:EventBus, previousTabResult} = new useWizard(tabs)

function addPanel() {
    return new Promise((resolve, reject) => {
        panelStore.createPanel()
        panelStore.resetCreatePanelWizard()
        activeComponent = tabs.value[0]
        resolve(true)
    })
}


const hasPreviousResult = computed(() => {
  return (Object.keys(previousTabResult.value).length > 0) &&
      previousTabResult.value[activeComponent.value.outputKey]
})


</script>

<template>
<Modal :show="open" size="large" no-close>
    <template #title>
        <div class="flex items-center space-x-2">
            <SvgIcons class="h-5" name="workshop" />
            <span class="font-medium">{{ panelStore.newPanel.name || 'Panel Workshop' }}</span>
        </div>
    </template>
    <template #body>
        <div class="p-4 mb-10 overflow-hidden scrollbar-hide">
            <Transition :key="activeComponent"
              enter-active-class="transform ease-out duration-300 transition delay-100 opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition opacity-100 ease-in duration-100"
              leave-to-class="opacity-0"
              appear
            >
                <section>
                    <section v-if="activeComponent.id === 1">
                        <div class="flex space-x-2">
                            <span class="flex items-center justify-center grow-0 shrink-0 h-6 w-6 bg-success rounded-full text-white text-xs">1</span>
                            <div>
                                <h3 class="font-medium dark:text-slate-100">Add panel identification details</h3>
                                <small class="text-slate-500 dark:text-slate-300">This will tell what the panel is about at a glance</small>
                                <div class="flex space-x-2 mt-5">
                                    <div>
                                      <label for="name" class="block text-sm font-medium dark:text-slate-300">Panel Name</label>
                                      <div class="mt-1">
                                        <input v-model="panelStore.newPanel.name" type="text" name="name" id="name" class="dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100 focus:ring-green-500 focus:border-green-500 block w-[300px] sm:text-sm border-gray-300 rounded" placeholder="Panel title">
                                      </div>
                                    </div>
                                    <div>
                                      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                                      <div class="mt-1">
                                        <input v-model="panelStore.newPanel.description" type="text" name="description" id="description" class="dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100 focus:ring-green-500 focus:border-green-500 block w-[300px] sm:text-sm border-gray-300 rounded placeholder:text-gray-400 placeholder:text-xs" placeholder="What is the panel for?">
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex space-x-2 mt-5">
                            <span class="flex items-center justify-center grow-0 shrink-0 h-6 w-6 bg-success rounded-full text-white text-xs">2</span>
                            <div class="w-full">
                                <h3 class="font-medium dark:text-slate-100">Choose Visualisation Type</h3>
                                <small class="text-slate-500 dark:text-slate-300">Choose the proper visualisation type from the categories listed below</small>
                                <div class="rounded space-x-2 mt-5 border dark:border-slate-600 grid grid-cols-12">
                                    <div class="col-span-2 border-r dark:border-slate-600 p-2">
                                        <span @click="selected_category = 'all'" class="p-2 rounded cursor-pointer text-slate-600 text-xs mt-2 flex items-center space-x-1 dark:text-slate-200 hover:dark:bg-slate-700 hover:bg-slate-100 transition-all duration-300" :class="{'bg-slate-100 dark:bg-slate-600' : selected_category === 'all'}">
                                            <SvgIcons name="categories" class="h-3 fill-slate-300" />
                                            <span>Everything</span>
                                        </span>
                                        <span class="text-slate-300 text-xs px-1 mt-2">Categories</span>
                                        <div class="flex flex-col">
                                            <template v-for="item in categories">
                                                <span @click="selected_category = item"
                                                      class="p-2 rounded cursor-pointer text-slate-600 text-xs mt-2 flex items-center space-x-1 hover:bg-slate-100 dark:text-slate-200 hover:dark:bg-slate-700 transition-all duration-300"
                                                      :class="{'bg-slate-100 dark:bg-slate-700' : selected_category === item}"
                                                >
                                                    <SvgIcons name="categories" class="h-3 fill-slate-300" />
                                                    <span>{{item}}</span>
                                                </span>
                                            </template>

                                        </div>
                                    </div>
                                    <div class="col-span-10 p-2">
                                        <input v-model="widgetQuery" type="text" name="name" id="name" class="dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-200 rounded placeholder:text-gray-400" placeholder="Search for widgets by name and category…">

                                        <div class="mt-5 grid grid-cols-7 gap-4">
                                            <template v-for="widget in filteredWidgets">
                                                <div class="col-span-1">
                                                    <div
                                                        :class="[
                                                            panelStore.newPanel.widget === widget ? 'border-2 border-green-500' : 'border border-slate-200 dark:border-slate-600'
                                                        ]"
                                                        @click="panelStore.newPanel.widget = widget" class="p-2 rounded hover:shadow transition-all cursor-pointer" :title="widget.label">
                                                        <img :src="widget.image" :alt="widget.label">
                                                    </div>
                                                    <div class="whitespace-nowrap truncate">
                                                        <small class="text-slate-400">{{widget.label}}</small>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section v-if="activeComponent.id === 2">
                        <div>
                            <div class="flex space-x-2 mt-5">
                                <span class="flex items-center justify-center grow-0 shrink-0 h-6 w-6 bg-success rounded-full text-white text-xs">3</span>
                                <div class="w-full">
                                    <h3 class="font-medium dark:text-slate-100">Configure the selected widget</h3>
                                    <small class="text-slate-500 dark:text-slate-300">This will tell what the panel is about at a glance</small>
                                </div>
                            </div>
                            <PanelEditor class="mt-4" />
                        </div>
                    </section>
                </section>
            </Transition>
        </div>
    </template>

    <template #footer>
        <div class="w-full flex items-center justify-between">
            <CButton @click="$emit('close')" variant="secondary">Cancel</CButton>

            <div class="flex space-x-2">
                <CButton @click="prev" v-if="activeComponent.id > 1" variant="secondary">&larr; Back</CButton>
                <CButton :disabled="!detailsAreValid" @click="next" variant="success">
                    <span v-if="activeComponent.outputKey">
                        Next &rarr;
                    </span>
                    <span v-else>Finish</span>
                </CButton>
            </div>
        </div>
    </template>
</Modal>
</template>

<style scoped>

</style>
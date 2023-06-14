import { defineStore } from 'pinia'
import bar_chart from "@/components/Panel/widgets/bar_chart";
import label from "@/components/Panel/widgets/label";

export const usePanelStore = defineStore('panelsStore', {
   state: () => ({
       panels: {
           bar_chart: bar_chart,
           label: label
       },
   }),
})
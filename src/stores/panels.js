import { defineStore } from 'pinia'
import {label_options, styles} from "@/components/Panel/widgets/label/index.js";
import {pie_options, styles as pieStyles} from "@/components/Panel/widgets/pie_chart/index.js";

export const usePanelStore = defineStore('panelsStore', {
   state: () => ({
       panels: {
           label:{options:label_options, styles},
           pie_chart:{options:pie_options, pieStyles}
       },
   }),
})
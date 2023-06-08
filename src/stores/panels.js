import { defineStore } from 'pinia'
import {label_options, styles} from "@/components/Panel/collection/label/index.js";

export const usePanelStore = defineStore('panelsStore', {
   state: () => ({
       panels: {
           label:{options:label_options, styles}
       },
   }),
})
import Component from "./Label.vue";
import {visualizer_requirements} from "../../FormTypes";


const default_requirements: visualizer_requirements = {
    backend_query: false,
    data: [],
    categories: [],
    chartOptions: {},
    fields: [
        {
          elementType: 'input',
          label: 'Label',
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Untitled Label',
        }
    ]
}

class Label {
    id: string = 'label'
    label: string = 'Label'
    image:string = '/images/number.png'
    categories:string[] = ['Label', 'all']
    component: object = Component
    requirements: visualizer_requirements

    constructor() {
        this.requirements = default_requirements
    }
}

export default {
     id: 'label',
    label: 'Label',
    image: '/images/number.png',
    categories: ['label','all'],
    itemClass: Label
}
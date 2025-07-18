import Component from "./Label.vue";
import {visualizer_requirements} from "../../FormTypes";


const default_requirements: visualizer_requirements = {
    backend_query: false,
    data: [],
    categories: [],
    chartOptions: {},
    style_fields:{
        "single-color": false,
        'chart-color' : '#34456E',
        color_scheme: false,
        'label-color':{
            title:'#34456E',
            background:'#ffffff',
            border:'#ececec'
        },
        'font-size': {
            title: 12,
        },
    },
    fields: [
        {
          elementType: 'textarea',
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
    categories: ['Label', 'all'],
    itemClass: Label
}
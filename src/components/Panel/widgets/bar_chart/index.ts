import Component from "./BarChart.vue";
import {visualizer_requirements} from "../../FormTypes";

const default_requirements: visualizer_requirements = {
    backend_query: true,
    data: [23, 24, 18, 25, 27, 28, 25],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    chartOptions: {
        title: {
         text: 'Chart Title',
         left: 'center',
         rich: {}
       },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            // data: ['Chart data']
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
             name: 'Chart data',
              data: [],
              type: 'bar',
              showBackground: false,
              backgroundStyle: {
                color: '#f1f1f1'
              }
            }
          ]
    },
    fields: []
}

class BarChart {
    id: string = 'bar_chart'
    label: string = 'Bar Chart'
    image:string = '/images/bar.png'
    categories:string[] = ['Bar chart', 'bar', 'all']
    component: object = Component
    requirements: visualizer_requirements

    constructor() {
        this.requirements = default_requirements
        this.requirements.chartOptions.xAxis.data = default_requirements.categories
        this.requirements.chartOptions.series[0].data = default_requirements.data
    }
}

export default {
     id: 'bar_chart',
    label: 'Bar Chart',
    image: '/images/number.png',
    categories: ['Barchart', 'bar','chart','all'],
    itemClass: BarChart
}
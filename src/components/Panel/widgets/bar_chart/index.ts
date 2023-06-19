import Component from "./BarChart.vue";
import {visualizer_requirements} from "../../FormTypes";
import color_schemes from '../../color_schemes'

const default_requirements: visualizer_requirements = {
    backend_query: true,
    data: [23, 24, 18, 25, 27, 28, 25],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    chartOptions: {
        title: {
         text: 'Chart Title',
         left: 'center',
         rich: {},
         textStyle:{
             color:'#000000',
             fontSize:12
         }
       },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle:{}
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
              itemStyle:{},
              type: 'bar',
              showBackground: false,
              backgroundStyle: {
                color: '#f1f1f1'
              }
            }
          ]
    },
    style_fields:{
        "single-color": true,
        'chart-color' : '#34456E',
        color_scheme: 'tropical',
        'label-color':{
            title:'#34456E',
            legend:'#34456E'
        },
        'font-size': {
            title: 12,
            legend: 12
        },
    },
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

class BarChart {
    id: string = 'bar_chart'
    label: string = 'Bar Chart'
    image:string = '/images/bar.png'
    categories:string[] = ['Correlation', 'Distribution', 'all']
    component: object = Component
    requirements: visualizer_requirements

    constructor() {
        this.requirements = default_requirements
        this.requirements.chartOptions.xAxis.data = default_requirements.categories
        this.requirements.chartOptions.series[0].data = default_requirements.data

        //initialize state
        this.updateStyles()
        this.updateChartOptions()
    }
    /*
    * Apply label styles, color schemes
    * */
    updateStyles(){
        let styles = this.requirements.style_fields

        //title
        this.requirements.chartOptions.title.textStyle.color = styles['label-color']['title']
        this.requirements.chartOptions.title.textStyle.fontSize = styles['font-size']['title']

        //legend
        this.requirements.chartOptions.legend.textStyle.color = styles['label-color']['legend']
        this.requirements.chartOptions.legend.textStyle.fontSize = styles['font-size']['legend']

        // set color scheme
        //assuming one series
        if (this.requirements.style_fields['single-color']){
            this.requirements.chartOptions.series[0]['itemStyle']['color'] = this.requirements.style_fields['chart-color'] || color_schemes[styles['color_scheme']][0]
        }else{
            this.requirements.chartOptions.series[0]['itemStyle']['color'] = color_schemes[styles['color_scheme']]
        }

    }
    updateChartOptions(){
        //update label/title
        this.requirements.chartOptions.title.text = this.requirements.fields[0].defaultValue
    }
}

export default {
     id: 'bar_chart',
    label: 'Bar Chart',
    image: '/images/number.png',
    categories: ['Barchart', 'bar','chart','all'],
    itemClass: BarChart
}
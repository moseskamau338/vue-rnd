import PieChart from "@/components/Panel/widgets/pie_chart/PieChart.vue";

export const pie_options = {
    id: "pie_chart",
    name: 'Pie Chart',
    component: PieChart,
    image:'/images/pie.png',
    categories:['pie', 'comparison','correlation', 'all'],
    query: {
     db_query: true,
     collection: null,
      function: {
        type: "sum",
        fields: []
      },
      filters: []
    },
    size_position: {
      position: {
        x: 0,
        y: 0
      },
      size: {
        width: 100,
        height: 300
      }
    }
}
export const styles = {
      color_scheme: "color_id",
      label_colors: {},
      chart_appearance: {}
      //other configurations
}
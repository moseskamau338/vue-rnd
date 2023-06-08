import Label from "@/components/Panel/widgets/label/Label.vue";

export const label_options = {
    id: "label",
    name: 'Label',
    component: Label,
    image:'/images/number.png',
    categories:['Label', 'all'],
    query: {
     db_query: false,
     value:'',
     //collection: null,
     // function: {
     //   type: "sum",
     //   fields: []
     // },
     // filters: []
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
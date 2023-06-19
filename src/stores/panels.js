import { defineStore } from 'pinia'
import bar_chart from "@/components/Panel/widgets/bar_chart";
import label from "@/components/Panel/widgets/label";
import {nextTick} from "vue";

export const usePanelStore = defineStore('panelsStore', {
   state: () => ({
        is_editing: false,
        show_panel_wizard: false,
        grid: null,
       //page management
       activePage: null,
       pages:[
          {type:'header', name:'Pages'},
          {
              id: 'acc_metrics',
              type:'menu',
              name:'Accounts Metrics',
              disabled: false,
              widgets: [
                    {
                        id: 1,
                        title: "Widget - Accounts Metrics",
                        grid: {
                          x: 0, y: 0,
                          w: 2, h: 2,
                        },
                    },
                    {
                        id: 2,
                        title: "Widget - Accounts Metrics 2",
                        grid: {
                          x: 2, y: 0,
                          w: 2, h: 1,
                        },
                    },
                    {
                        id: 3,
                        title: "Widget - Accounts Metrics 3",
                        grid: {
                          x: 0, y: 2,
                          w: 2, h: 1,
                        },
                    },
                    {
                        id: 4,
                        title: "Widget - Accounts Metrics 4",
                        grid: {
                          x: 2, y: 2,
                          w: 3, h: 2,
                        },
                    },
                    {
                        id: 5,
                        title: "Widget - Accounts Metrics 5",
                        grid: {
                          x: 3, y: 2,
                          w: 2, h: 2,
                        },
                    },
                ],
          },
          {
              id:'transaction_overview',
              type:'menu',
              name:'Transactions Overview',
              disabled: false,
              widgets: []
          },
        ],
       newPageName:'',
       showing_sidebar:false,
       showAddPageInput:false,

        panels: {
           bar_chart: bar_chart,
           label: label
        },
        activePanels: [],
   }),
    actions:{
       //manage page:
        addPage: () => {
             if(this.newPageName.length <= 0) return;

             this.pages.push(
                 {
                     id:this.newPageName.split(' ').join('_').toLowerCase(),
                     type:'menu',
                     name: this.newPageName,
                     disabled: false
                 },
             )
            this.newPageName = ''
            this.showAddPageInput = false
        },
       initGridStack(GridStack) {
          this.grid = GridStack.init({
            column: 6,
            cellHeight: 100,
            margin: 8,
            disableResize: !this.is_editing,
            disableDrag: !this.is_editing,
          });
          this.makeWidgets(this.activePage.widgets);
        },

        makeWidgets(widgets) {
          widgets.forEach((widget) => {
            this.makeWidget(widget);
          });
        },
        makeWidget(item) {
          const elSelector = `#${item.id}`;
          return this.grid.makeWidget(elSelector);
        },

        async addWidget() {
          const widgetCount = this.activePage.widgets.length + 1;
          const widget = {
            id: widgetCount,
            title: `Widget ${widgetCount}`,
            grid: {
              w: 2, h: 1,
            },
            widget: []
          };
          this.activePage.widgets.push(widget);
          await nextTick();
          console.log('Adding widget...', widget)
          this.makeWidget(widget);
        },

        deleteWidget(widget) {
          const index = this.activePage.widgets.findIndex((w) => w.id === widget.id);
          if (index === -1) {
            return;
          }
          const selector = `#${CSS.escape(widget.id)}`;
          this.grid.removeWidget(selector);
          this.grid.compact();
          this.activePage.widgets.splice(index, 1);
        },

        toggleEdit() {
          if (this.is_editing) {
            this.grid.disable();
          } else {
            this.grid.enable();
          }
          this.is_editing = !this.is_editing;
        },

    }
})
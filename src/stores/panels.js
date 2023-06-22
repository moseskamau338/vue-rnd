import { defineStore } from 'pinia'
import bar_chart from "@/components/Panel/widgets/bar_chart";
import label from "@/components/Panel/widgets/label";
import {nextTick} from "vue";
import {find} from "lodash/collection";

export const usePanelStore = defineStore('panelsStore', {
   state: () => ({
        is_editing: false,
        show_panel_wizard: false,
        grid: null,
       //page management
       activePageIndex: 0,
       pages:[
          {
              id: 'acc_metrics',
              type:'menu',
              name:'Accounts Metrics',
              disabled: false,
              widgets: [],
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
       showing_sidebar:true,
       showAddPageInput:false,

       newPanel: {
           name:'',
           description:'',
           widget:{}
        },

        panels: {
           bar_chart: bar_chart,
           label: label
        },
   }),
    getters:{
       activePage(state){
           return state.pages[state.activePageIndex]
       }
    },
    actions:{
       //manage page:
        addPage() {
             if(this.newPageName.length <= 0) return;

             this.pages.push(
                 {
                     id:this.newPageName.split(' ').join('_').toLowerCase(),
                     type:'menu',
                     name: this.newPageName,
                     disabled: false,
                     widgets:[]
                 },
             )
            this.newPageName = ''
            this.showAddPageInput = false
        },
       initGridStack(GridStack) {
          this.grid = GridStack.init({
            column: 8,
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
          window.grid = this.grid
          return this.grid.makeWidget(elSelector);
        },

        async addWidget() {
            if (this.newPanel.name.length <= 0 || Object.keys(this.newPanel.widget).length <= 0) return;


          const widgetCount = this.activePage.widgets.length + 1;
          const widget = {
            id: this.newPanel.name+'-'+widgetCount,
            title: this.newPanel.name,
            grid: {
              w: 3, h: 3,
            },
             ...this.newPanel
          };
          this.activePage.widgets.push(widget);
          await nextTick();
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

        toggleEdit(e, save = false) {
            console.log('Saving: ', this.grid.save())
          if (this.is_editing) {
            if (save){
                this.updateCurrentPageGrid()
                    .then(() => {
                        this.grid.disable();
                    })
            }
          } else {
            this.grid.enable();
          }
          this.is_editing = !this.is_editing;
        },

        // create panel
        async createPanel(){
            await this.addWidget()
        },
        resetCreatePanelWizard(){
            this.show_panel_wizard = false
            this.newPanel = {
               name:'',
               description:'',
               widget:{}
            }
        },

        //navigation
        async updateCurrentPageGrid(){
            console.log('Saving grid')
            return new Promise((resolve, reject) => {
                const gridItems = this.grid.getGridItems();
                gridItems.forEach((item) => {
                    item = item.gridstackNode
                    const updateWidget = find(this.activePage.widgets, {id: item.id})
                    if (updateWidget){
                        updateWidget.grid = {
                           x: item.x,     y: item.y,
                           w: item.w, h: item.h,
                         }
                    }
                })
                resolve()
            })
        },
        async switchTab(index){
            //update grid
            await this.updateCurrentPageGrid()
            this.activePageIndex = index
        }

    }
})
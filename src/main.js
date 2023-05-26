import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {tableResizer} from "./library/directives/columnResizeDirective";
import mitt from 'mitt'

 const emitter = mitt()
createApp(App)
    .provide('emitter', emitter)
    .directive('table-resizer', tableResizer)
    .mount('#app')

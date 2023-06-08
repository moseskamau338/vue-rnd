import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {tableResizer} from "./library/directives/columnResizeDirective";
import mitt from 'mitt'
import { createPinia } from 'pinia'

const pinia = createPinia()

 const emitter = mitt()
createApp(App)
    .use(pinia)
    .provide('emitter', emitter)
    .directive('table-resizer', tableResizer)
    .mount('#app')

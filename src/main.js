import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {tableResizer} from "./library/directives/columnResizeDirective";

createApp(App)
    .directive('table-resizer', tableResizer)
    .mount('#app')

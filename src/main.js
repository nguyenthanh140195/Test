import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
// import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import $ from "jquery";
// import "jquery-ui";
import 'jquery-ui/ui/widgets/draggable';
window.$ = $

const app = createApp(App)

app.use(router)
// app.use(ElementPlus)

app.mount('#app')

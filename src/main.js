import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route'
import '@/assets/main.css'
import 'easymde/dist/easymde.min.css'
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

createApp(App).use(router).use(ElementPlus).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createPinia } from 'pinia'

import { ElIcon } from 'element-plus'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component('el-icon', ElIcon)
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')

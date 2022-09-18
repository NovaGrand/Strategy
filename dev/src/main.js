import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import mew from './plugins/mew'

createApp(App).use(mew).use(router).mount('#app')

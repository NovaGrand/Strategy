import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import mew from './plugins/mew'

import { createPinia } from 'pinia'

import * as api from 'vue'
for(let key in api) window[key] = api[key]
createApp(App).use(mew).use(router).use(createPinia()).mount('#app')


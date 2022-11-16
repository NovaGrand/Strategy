import { createApp } from 'vue'
import mewApp from './mew-app'

// 创建容器
let el = document.createElement('div')
    el.setAttribute('id','mew')
    document.body.appendChild(el)

// 挂载组件
createApp(mewApp).mount(el)


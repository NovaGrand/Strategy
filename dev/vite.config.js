import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // 忽略后缀名的配置选项
    // 即使可以忽略 .vue 后缀，项目中引入时也必须加上 .vue ，否则 build 后依然报错
    extensions: ['.html','.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss']
  },
  server:{
    host: '0.0.0.0',
    port: 3000,
    open: '/',
  },
  build:{
    // 如果构建后无法使用，先尝试删除 rollupOptions
    // rollupOptions:{
    //   input:'./index.html'
    // },
    outDir:'./dist',
  }
})

<template>
    <!--Vue3 对样式相关功能进行了加强-->
    <div class="home" bold fill ac jc lg column>
        <router-link red my-sm to="/compositionAPI">CompositionAPI</router-link>
        <router-link blue my-sm to="/babylon">{{ title.name }}</router-link>
        <div my-md>{{ store.double }}</div>
        <div my-md>{{ store.name }}</div>
        <div my-md ba blue><field fill></field></div>
        <btn vanilla golden bg xs @click="store.getCurrent">getCurrent</btn>
    </div>
</template>

<script setup>
import useMainStore from '@/store/index.js'
const store = useMainStore()

let title = ref({
    name: 'babylon.js',
})
store.$state = {
    count: store.count + 2,
    name: 'Pinia',
}
store.$subscribe((mutation, state) => {
    console.log('数据变化详情:', mutation)
    console.log('当前数据:', state)
})
// setInterval(()=>{
//     store.count += 1
// },1000)
</script>

<style lang="scss">
div.home {
    --bbb: blue;
    --aaa: bbb;
    background-color: var(var(--aaa));
    iframe {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
    }
}
</style>

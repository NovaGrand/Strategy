<template>
    <!--Vue3 对样式相关功能进行了加强-->
    <div class="home" :class="$attrs.class" :style="{ color: color, fontSize: fontSize + 'px' }" bold fill ac jc lg column>
        <div my-sm>{{ title }}</div>
        <div my-sm>{{ state.name }}</div>
        <div my-sm>{{ state.age }} 岁</div>
        <div my-sm>身高 {{ height }}</div>
        <div my-sm >{{ isAdult ? '成年' : '未成年'}}</div>
        <btn my-sm vanilla xs blue bg @click="click">Age ++</btn>
        <field ba blue v-focus v-model="state.name"/>
        <div wd-md blue mt-lg jc>
            <a href="/learn_1">learn_1</a>
        </div>
    </div>

</template>

<script setup>
// import { ref, reactive, defineEmits, watch, computed, provide, inject,onMounted } from 'vue'
// 子组件直接引入就可以在模板中使用
// import ComponentA from './ComponentA.vue'

// 任意类型 响应数据，setup 中使用需要通过 .value 调用
let [title, color, fontSize ] = [ref('个人信息'), ref('red'), ref(20)]
// 对象类型 响应数据
let [state, books] = [
    reactive({
        name:'张三',
        age: 13
    }),
    reactive(['Hello World', ref('Vue 3')])
]
onMounted(()=>{
    console.log(1111)
})
// 提供数据依赖
provide('state', {
    state
})
// 子组件通过 const { state } = inject('state') 获取

// props
defineProps({
  height: {
      type: [Number, String],
      default: '1.8'
  }
})
// computed
const isAdult = computed(
    () => state.age >= 18, // getter
    ()=>{                  // setter

    })
// watch 单个
watch( isAdult,(val, raw) => {
    console.log(val)
})
// watch 对象属性
watch(() => state.age, (val) => {
    console.log(val)
    }
)
// watch 多个
// watch([x, () => y.value], ([newX, newY]) => {
//     console.log(`x is ${newX} and y is ${newY}`)
// }, { deep: true })

// 声明组件事件
const emit = defineEmits(['focus', 'submit'])
// or 自定义事件触发前的验证
// const emit = defineEmits({
//     submit(payload) {
//         // 通过返回值为 `true` 还是为 `false` 来判断
//         // 验证是否通过
//     }
// })
function click(){
    state.age += 1
}
// 自定义指令 v-focus
const vFocus = {
    mounted: (el) => {
        // el.focus()
    }
}
</script>



<style scoped lang="scss">
div.home{
}
</style>

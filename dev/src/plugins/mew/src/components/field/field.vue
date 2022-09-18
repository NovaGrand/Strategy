<template>
    <div class="mew-field" :class="[ mode, checked, picking, error ]"
         @mousedown.once="activated = true"
         @click="toggle"
    >
        <!--文本输入框和勾选框组件-->
        <component :is="component"><slot/></component>
    </div>
</template>

<script>
import inits from './mixins/inits' // 基本属性
import types from './mixins/types' // 时间、日期、文件等其他输类型
import validate from './mixins/validate' // 输入验证

import { selecting } from '../../../mew'

export default {
    name: "mew-field",
    emits: ['update:modelValue', 'change', 'blur', 'focus'],
    mixins: [ inits, types, validate ],
    provide() {
        return {
            field: this
        }
    },
    data(){
        return {
            focus: false, // 文本框输入状态
            error: '', // 当 validate 生效时启用
            activated: false, // 输入框组件是否激活（防止 label 标签挂载后自动播放动画）
            selecting
        }
    },
    props:{
        modelValue:{
            type:[ String, Boolean, Number ], default: ''
        },
    },
    methods:{
        toggle(e){
            if(this.component === 'Check'){
                this.$emit('update:modelValue', this.value === 'mew-default' ? !this.modelValue : this.value)
            }
            else{
                if(e.target === this.$el)
                    this.$el.getElementsByTagName(this.area ? 'textarea' : 'input')[0].focus()
                if(this.select){
                    if(this.selecting.target)
                        this.selecting.wrapper.unload()
                    else
                        this.selecting.target =  this
                }
            }
        },
        $focus(){  // 用于外部调用
            this.$el.getElementsByTagName(this.area ? 'textarea' : 'input')[0].focus()
        }
    }
}
</script>

<style lang="scss">
div.mew-field{
    display: inline-block;
    position: relative;
    overflow: visible!important;// 制止 bv 等属性的 hidden
    transition: all .1s linear;
    // 默认内间距
    --pt:6;--pb:6;--pl:8;--pr:8;
    // 默认倒角
    --bdrd:.2em;
    // 边框颜色深度调整
    --adjust-border:0.02;
    // 字体大小
    --xfs:15;--fs:0;
    &:hover{
        --adjust-border:0.04;
    }
}
</style>
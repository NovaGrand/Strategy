<script>
import Input from '../components/input' // 文本输入框
import Check from '../components/check' // 勾选或多选框
export default {
    name: "mew-field-inits",
    components: { Input, Check },
    props: {
        value:{ // check 模式下，可以为 checked 赋值
            type:[ String, Number ], default:'mew-default'
        },
        text:{
            type: Boolean,
            default: false
        },
        area:{
            type: Boolean,
            default: false
        },
        check:{
            type: Boolean,
            default: false
        },
        select:{
            type: Boolean,
            default: false
        },
        placeholder:{
            type: String,
            default: ''
        },
        label:{ // 活动标签，功能与 placeholder 类似，可与 placeholder 共用
            type:[ String, Number ], default:''
        },
        jc:{ type: Boolean, default: false },
        je:{ type: Boolean, default: false },
    },
    computed:{
        component(){
            return this.check && !this.select ? 'Check' : 'Input'
        },
        snap(){
            let arr = ['bb','bb-xs','bb-sm','bb-md','bb-lg','bb-xl']
            let snap = false
            for(let i=0;i<arr.length;i++)
                if(this.$.attrs.hasOwnProperty(arr[i])){
                    snap = true
                    break
                }
            return snap
        },
        mode(){
            let area = this.area ? ' area': ''
            let vain = (this.invalid || this.disabled) ? ' vain' : ''
            let snap = this.snap ? ' snap' : ''  // 两端对齐的情况
            let hint = this.label ? ' hint' : '' // 有 label 标签时的情况
            let check = this.check ? ' check' : ''
            let select = this.select ? ' select' : ''
            return area + vain + snap + hint + check + select
        },
        checked(){
            return this.check && (this.modelValue === true || (this.value !== 'default' && this.modelValue === this.value)) ? 'checked' : ''
        },
        picking(){
            return this.selecting.target === this ? 'selecting': ''
        }
    }
}
</script>

<style lang="scss">
div.mew-field{
    &.area{ // 调整多行输入下的默认内边距
        --pt:7;--pb:7;--pl:11;--pr:3;
    }
    &.vain{ // disabled 的样式
        opacity: .4;
        pointer-events: none;
    }
    &.snap{
        --pl:0;--pr:0;
        --bdrd:0;
    }
    &.hint:not(.select,.check){
        border-color: transparent;
    }
    &.check{
        cursor: pointer;
        --bdrd:.1em;
        --pt:6;--pb:6;--pl:6;--pr:6;
        filter: saturate(.5);
        opacity: .5;
        &.checked{
            filter: saturate(1);
            opacity: 1;
        }
    }
    &.select{
        transition: box-shadow .1s linear;
        &.selecting{
            border-color: transparent;
            box-shadow: 0 0 transparent;
            &::after{
                display: none;
            }
        }
        &::after{
            color: inherit;
            pointer-events: none;
            position: absolute;content: '▼';top: calc(50% - .4em);right: .6em;
            width: 1em;height: 1em;
            transform: scaleY(.65);
        }

    }
    &.error{
        &::before{
            @keyframes mew-field-errorOutline {
                0%{ box-shadow: 0 0 0 1px #d60000 }
                50%{ box-shadow: 0 0 0 2.5px #ff4747 }
                100%{ box-shadow: 0 0 0 1px #d60000 }
            }
            position: absolute;left: 0;top:0;width: 100%;height: 100%;content: '';
            border-radius: var(--bdrd);
            animation: mew-field-errorOutline 1.2s infinite;
        }
        &::after{
            @keyframes mew-field-errorMessage {
                0%{ opacity: .5 }
                50%{ opacity: 1 }
                100%{ opacity: .5 }
            }
            position: absolute;right: 0;top:0;
            width: 100%;height: 100%;
            content: var(--errorMessage);
            display: flex;align-items: center;justify-content: end;
            transform: scale(.7);transform-origin: 90% 58%;
            font-size: .5em;
            color: #d60000;
            animation: mew-field-errorMessage 1.2s infinite;
            z-index: 9999;
            pointer-events: none;
        }
    }
}
</style>

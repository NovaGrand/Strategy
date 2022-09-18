<template>
    <div class="mew-field-input">
        <input v-if="!field.area" fill :class="{ jc: field.jc, je: field.je }"
               :placeholder="field.placeholder"
               :value="value"
               :type="field.type"
               :readonly="readonly"
               @focus="focus"
               @blur="blur"
               @change="field.$emit('change');validate()"
               @input="input"
        >
        <textarea v-else fill noresize cols="30" rows="3" :class="{ jc: field.jc, je: field.je }"
                  :placeholder="field.placeholder"
                  :value="value"
                  :readonly="readonly"
                  @focus="focus"
                  @blur="blur"
                  @change="field.$emit('change');validate()"
                  @input="input"
        />
    </div>
    <!--下拉选择列表-->
    <drop-list v-if="field.select"><slot/></drop-list>
    <!--label 标签-->
    <label-tag v-if="field.label"/>
</template>

<script>
import dropList from './dropList'
import labelTag from './labelTag'
export default {
    name: "mew-field-input",
    inject: ['field'],
    components:{ dropList, labelTag },
    data(){
        return {
            snapshot: '',
        }
    },
    methods:{
        input(e){
            if(this.field.error) this.field.error = ''
            this.field.$emit('update:modelValue', this.field.number ? Number(e.target.value) : e.target.value)
        },
        validate(){
            this.field.error = ''
            this.$nextTick(()=>{
                if(this.field.require && this.field.modelValue.trim() === '')
                    this.error('必填')
                if(this.field.username){
                    let str = "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
                    let reg = new RegExp(str)
                    if( reg.test(this.value))
                        this.error('特殊字符不可用')
                }
                if(this.field.email){
                    let str = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"
                    let reg = new RegExp(str)
                    if(!reg.test(this.value))
                        this.error('邮箱不可用')
                }
                if(this.field.min && this.value.length < this.field.min)
                    this.error('至少 ' + this.field.min + ' 个字符')
                if(this.field.max && this.value.length > this.field.max)
                    this.error('最多 ' + this.field.max + ' 个字符')
                if(this.field.validate)
                    this.error(this.field.validate(this.value))
            })
        },
        checkEmpty(){
            if(this.field.error){

            }
            else if(this.field.require && this.field.modelValue.trim() === ''){
                this.field.error = 'error'
                this.error('必填')
            }
        },
        error(str){
            if(str){
                this.snapshot = this.field.modelValue
                this.field.$emit('update:modelValue', false)
                this.field.error = 'error'
                this.field.$el.style.setProperty('--errorMessage', `'${str}'`)
            }
        },
        focus(){
            this.field.focus = true
            this.field.$emit('focus')
        },
        blur(){
            this.field.focus = false
            this.field.$emit('blur')
            this.checkEmpty()
        }
    },
    computed:{
        readonly(){
            return this.field.select && !this.field.text
        },
        value(){
            return this.field.error ? this.snapshot : this.field.modelValue
        }
    },
}
</script>

<style lang="scss">
div.mew-field-input{
    position: relative;z-index: 9999;
    textarea,input{
        padding: 0;
        font-family: 微软雅黑;
        -webkit-user-drag: none;
        background-color: transparent;
        &.jc{
            text-align: center
        }
        &.je{
            text-align: right
        }
        &[readonly]{
            cursor: default;
        }
        &::placeholder{
            transform: scale(.9);
            transform-origin: left center;
            color: inherit;
            opacity: .3;
            user-select: none;
        }
    }
    input{
        padding-bottom: .1em;
    }
    textarea{
        line-height: 1.4em;
        vertical-align: top;
        resize: none;
        &::-webkit-scrollbar {
            width: 4px; /* Mostly for vertical scrollbars */
        }
        &::-webkit-scrollbar-thumb { /* Foreground */
            width: 4px;
            background:rgba(0,0,0,.16);
            border-radius: 10px;
            &:hover{
                background:rgba(0,0,0,.3);
            }
        }
        &::-webkit-scrollbar-track { /* Background */
            background: transparent;
        }
    }
    input[type="time"]{
        &::-webkit-datetime-edit-fields-wrapper{
            display: flex;align-items: center;
            padding: 0;
        }
        &::-webkit-calendar-picker-indicator{
            margin: 0;
        }
    }
    input[type="date"]{
        &::-webkit-datetime-edit{
            overflow: visible;
        }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
    input[type="number"] {
        -moz-appearance:textfield; /* Firefox */
    }
    input[type="file"] {
        &::-webkit-file-upload-button{
            font-size: .8em;
            height: 100%;
        }
    }
}
</style>